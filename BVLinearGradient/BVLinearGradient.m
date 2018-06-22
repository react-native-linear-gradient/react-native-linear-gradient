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

- (void)setStartPoint:(CGPoint)startPoint
{
  self.gradientLayer.startPoint = startPoint;
}

- (void)setEndPoint:(CGPoint)endPoint
{
  self.gradientLayer.endPoint = endPoint;
}

- (void)setLocations:(NSArray *)locations
{
  self.gradientLayer.locations = locations;
}

@end
