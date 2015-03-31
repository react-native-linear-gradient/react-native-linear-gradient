#import "BVLinearGradient.h"
#import "RCTConvert.h"
#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

@implementation BVLinearGradient

+ (Class)layerClass
{
  return [CAGradientLayer class];
}

- (CAGradientLayer *)gradientLayer
{
  return (CAGradientLayer *)self.layer;
}

- (void)setColors:(NSArray *)colorStrings
{
  NSMutableArray *colors = [NSMutableArray arrayWithCapacity:colorStrings.count];
  for (NSString *colorString in colorStrings) {
    [colors addObject:[RCTConvert UIColor:colorString].CGColor];
  }
  self.gradientLayer.colors = colors;
}

@end
