#import "BVLinearGradientLayer.h"

@implementation BVLinearGradientLayer
{
    BOOL _needsNewGradient;
    CGGradientRef _lastGradient;
}

- (instancetype)init
{
    self = [super init];
    
    if (self)
    {
        self.needsDisplayOnBoundsChange = YES;
        _needsNewGradient = YES;
    }
    
    return self;
}

- (void)setNeedsNewGradient
{
    _needsNewGradient = YES;
    [self setNeedsDisplay];
}

- (void)setColors:(NSArray<UIColor *> *)colors
{
    _colors = colors;
    [self setNeedsNewGradient];
}

- (void)setLocations:(NSArray<NSNumber *> *)locations
{
    _locations = locations;
    [self setNeedsNewGradient];
}

- (void)setStartPoint:(CGPoint)startPoint
{
    _startPoint = startPoint;
    [self setNeedsNewGradient];
}

- (void)setEndPoint:(CGPoint)endPoint
{
    _endPoint = endPoint;
    [self setNeedsNewGradient];
}

- (void)drawInContext:(CGContextRef)ctx
{
    if (!_colors)
        return;
    
    if (!_lastGradient || _needsNewGradient)
    {
        CGFloat *locations = nil;
        
        locations = malloc(sizeof(CGFloat) * _colors.count);
        
        for (NSInteger i = 0; i < _colors.count; i++)
        {
            if (_locations.count > i)
            {
                locations[i] = _locations[i].floatValue;
            }
            else
            {
                locations[i] = (1 / (_colors.count - 1)) * i;
            }
        }
        
        _lastGradient = CGGradientCreateWithColors(nil, (CFArrayRef)_colors, locations);
        _needsNewGradient = NO;
        
        free(locations);
    }
    
    CGSize size = self.bounds.size;
    
    if (size.width == 0.0 || size.height == 0.0)
        return;
    
    CGPoint start = self.startPoint, end = self.endPoint;
    
    CGContextDrawLinearGradient(ctx, _lastGradient,
                                CGPointMake(start.x * size.width, start.y * size.height),
                                CGPointMake(end.x * size.width, end.y * size.height),
                                kCGGradientDrawsBeforeStartLocation | kCGGradientDrawsAfterEndLocation);
}

@end
