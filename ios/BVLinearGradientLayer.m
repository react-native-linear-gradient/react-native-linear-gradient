#import "BVLinearGradientLayer.h"

#include <math.h>
#import <UIKit/UIKit.h>

@implementation BVLinearGradientLayer

- (instancetype)init
{
    self = [super init];

    if (self)
    {
        self.needsDisplayOnBoundsChange = YES;
        self.masksToBounds = YES;
        _startPoint = CGPointMake(0.5, 0.0);
        _endPoint = CGPointMake(0.5, 1.0);
        _angleCenter = CGPointMake(0.5, 0.5);
        _angle = 45.0;
    }

    return self;
}

- (void)setColors:(NSArray<id> *)colors
{
    _colors = colors;
    [self setNeedsDisplay];
}

- (void)setLocations:(NSArray<NSNumber *> *)locations
{
    _locations = locations;
    [self setNeedsDisplay];
}

- (void)setStartPoint:(CGPoint)startPoint
{
    _startPoint = startPoint;
    [self setNeedsDisplay];
}

- (void)setEndPoint:(CGPoint)endPoint
{
    _endPoint = endPoint;
    [self setNeedsDisplay];
}

- (void)display {
    [super display];

    BOOL hasAlpha = NO;

    for (NSInteger i = 0; i < self.colors.count; i++) {
        hasAlpha = hasAlpha || CGColorGetAlpha(self.colors[i].CGColor) < 1.0;
    }

    UIGraphicsBeginImageContextWithOptions(self.bounds.size, !hasAlpha, 0.0);
    CGContextRef ref = UIGraphicsGetCurrentContext();
    [self drawInContext:ref];

    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    self.contents = (__bridge id _Nullable)(image.CGImage);
    self.contentsScale = image.scale;

    UIGraphicsEndImageContext();
}

- (void)setUseAngle:(BOOL)useAngle
{
    _useAngle = useAngle;
    [self setNeedsDisplay];
}

- (void)setAngleCenter:(CGPoint)angleCenter
{
    _angleCenter = angleCenter;
    [self setNeedsDisplay];
}

- (void)setAngle:(CGFloat)angle
{
    _angle = angle;
    [self setNeedsDisplay];
}

+ (CGPoint) getStartCornerToIntersectFromAngle:(CGFloat)angle AndSize:(CGSize)size
{
    float halfHeight = size.height / 2.0;
    float halfWidth = size.width / 2.0;
    if (angle < 90)
        return CGPointMake(-halfWidth, -halfHeight);
    else if (angle < 180)
        return CGPointMake(halfWidth, -halfHeight);
    else if (angle < 270)
        return CGPointMake(halfWidth, halfHeight);
    else
        return CGPointMake(-halfWidth, halfHeight);
}

+ (CGPoint) getHorizontalOrVerticalStartPointFromAngle:(CGFloat)angle AndSize:(CGSize)size
{
    float halfWidth = size.width / 2;
    float halfHeight = size.height / 2;
    if (angle == 0) {
        // Horizontal, left-to-right
        return CGPointMake(-halfWidth, 0);
    } else if (angle == 90) {
        // Vertical, bottom-to-top
        return CGPointMake(0, -halfHeight);
    } else if (angle == 180) {
        // Horizontal, right-to-left
        return CGPointMake(halfWidth, 0);
    } else {
        // Vertical, top to bottom
        return CGPointMake(0, halfHeight);
    }
}

+ (CGPoint) getGradientStartPointFromAngle:(CGFloat)angle AndSize:(CGSize)size
{
    // Bound angle to [0, 360)
    angle = fmodf(angle, 360);
    if (angle < 0)
        angle += 360;

    // Explicitly check for horizontal or vertical gradients, as slopes of
    // the gradient line or a line perpendicular will be undefined in that case
    if (fmodf(angle, 90) == 0)
        return [BVLinearGradientLayer getHorizontalOrVerticalStartPointFromAngle:angle AndSize:size];

    // Get the equivalent slope of the gradient line as tan = opposite/adjacent = y/x
    float slope = tan(angle * M_PI / 180.0);

    // Find the start point by computing the intersection of the gradient line
    // and a line perpendicular to it that intersects the nearest corner
    float perpendicularSlope = -1 / slope;

    // Get the start corner to intersect relative to center, in cartesian space (+y = up)
    CGPoint startCorner = [BVLinearGradientLayer getStartCornerToIntersectFromAngle:angle AndSize:size];

    // Compute b (of y = mx + b) to get the equation for the perpendicular line
    float b = startCorner.y - perpendicularSlope * startCorner.x;

    // Solve the intersection of the gradient line and the perpendicular line:
    float startX = b / (slope - perpendicularSlope);
    float startY = slope * startX;

    return CGPointMake(startX, startY);
}

- (void)drawInContext:(CGContextRef)ctx
{
    [super drawInContext:ctx];

    CGContextSaveGState(ctx);

    CGSize size = self.bounds.size;
    if (!self.colors || self.colors.count == 0 || size.width == 0.0 || size.height == 0.0)
        return;

    CGFloat *locations = nil;

    locations = malloc(sizeof(CGFloat) * self.colors.count);

    for (NSInteger i = 0; i < self.colors.count; i++)
    {
        if (self.locations.count > i)
        {
            locations[i] = self.locations[i].floatValue;
        }
        else
        {
            locations[i] = (1.0 / (self.colors.count - 1)) * i;
        }
    }

    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    NSMutableArray *colors = [[NSMutableArray alloc] initWithCapacity:self.colors.count];
    for (UIColor *color in self.colors) {
        [colors addObject:(id)color.CGColor];
    }

    CGGradientRef gradient = CGGradientCreateWithColors(colorSpace, (CFArrayRef)colors, locations);

    free(locations);

    CGPoint start, end;

    if (_useAngle)
    {
        // Angle is in bearing degrees (North = 0, East = 90)
        // convert it to cartesian (N = 90, E = 0)
        float angle = (90 - _angle);
        CGPoint relativeStartPoint = [BVLinearGradientLayer getGradientStartPointFromAngle:angle AndSize:size];

        // Get true angleCenter
        CGPoint angleCenter = CGPointMake(
            _angleCenter.x * size.width,
            _angleCenter.y * size.height
        );
        // Translate to center on angle center
        // Flip Y coordinate to convert from cartesian
        start = CGPointMake(
            angleCenter.x + relativeStartPoint.x,
            angleCenter.y - relativeStartPoint.y
        );
        // Reflect across the center to get the end point
        end = CGPointMake(
            angleCenter.x - relativeStartPoint.x,
            angleCenter.y + relativeStartPoint.y
        );
    }
    else
    {
        start = CGPointMake(self.startPoint.x * size.width, self.startPoint.y * size.height);
        end = CGPointMake(self.endPoint.x * size.width, self.endPoint.y * size.height);
    }

    CGContextDrawLinearGradient(ctx, gradient,
                                start,
                                end,
                                kCGGradientDrawsBeforeStartLocation | kCGGradientDrawsAfterEndLocation);
    CGGradientRelease(gradient);
    CGColorSpaceRelease(colorSpace);

    CGContextRestoreGState(ctx);
}

@end
