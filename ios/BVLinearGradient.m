#import "BVLinearGradient.h"

#import <React/RCTConvert.h>
#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

#import "BVLinearGradientLayer.h"

@implementation BVLinearGradient

+ (Class)layerClass
{
  return [BVLinearGradientLayer class];
}

- (BVLinearGradientLayer *)gradientLayer
{
  return (BVLinearGradientLayer *)self.layer;
}

- (NSArray *)colors
{
    return self.gradientLayer.colors;
}

- (void)setColors:(NSArray *)colorStrings
{
    NSMutableArray *colors = [NSMutableArray arrayWithCapacity:colorStrings.count];
    for (NSString *colorString in colorStrings)
    {
        if ([colorString isKindOfClass:UIColor.class])
        {
            [colors addObject:(UIColor *)colorString];
        }
        else
        {
            [colors addObject:[RCTConvert UIColor:colorString]];
        }
    }
    self.gradientLayer.colors = colors;
}

- (CGPoint)startPoint
{
    return self.gradientLayer.startPoint;
}

- (void)setStartPoint:(CGPoint)startPoint
{
  self.gradientLayer.startPoint = startPoint;
}

- (CGPoint)endPoint
{
    return self.gradientLayer.endPoint;
}

- (void)setEndPoint:(CGPoint)endPoint
{
  self.gradientLayer.endPoint = endPoint;
}

- (NSArray *)locations
{
    return self.gradientLayer.locations;
}

- (void)setLocations:(NSArray *)locations
{
    self.gradientLayer.locations = locations;
}

- (BOOL)useAngle
{
    return self.gradientLayer.useAngle;
}

- (void)setUseAngle:(BOOL)useAngle
{
    self.gradientLayer.useAngle = useAngle;
}

- (CGPoint)angleCenter
{
    return self.gradientLayer.angleCenter;
}

- (void)setAngleCenter:(CGPoint)angleCenter
{
    self.gradientLayer.angleCenter = angleCenter;
}

- (CGFloat)angle
{
    return self.gradientLayer.angle;
}

- (void)setAngle:(CGFloat)angle
{
    self.gradientLayer.angle = angle;
}

@end
