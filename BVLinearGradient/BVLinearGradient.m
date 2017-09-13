#import "BVLinearGradient.h"
#import <React/RCTConvert.h>
#import <UIKit/UIKit.h>
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
    _colors = colorStrings;
    
    NSMutableArray *colors = [NSMutableArray arrayWithCapacity:colorStrings.count];
    for (NSString *colorString in colorStrings)
    {
        if ([colorString isKindOfClass:UIColor.class])
        {
            [colors addObject:(UIColor *)colorString];
        }
        else
        {
            [colors addObject:(id)[RCTConvert UIColor:colorString].CGColor];
        }
    }
    self.gradientLayer.colors = colors;
}

- (void)setStartPoint:(CGPoint)startPoint
{
    _startPoint = startPoint;
    self.gradientLayer.startPoint = startPoint;
}

- (void)setEndPoint:(CGPoint)endPoint
{
    _endPoint = endPoint;
    self.gradientLayer.endPoint = endPoint;
}

- (void)setLocations:(NSArray *)locations
{
    _locations = locations;
    self.gradientLayer.locations = locations;
}

- (BOOL)respondsToSelector:(SEL)aSelector
{
    if (aSelector == @selector(displayLayer:))
    {
        return NO;
    }
    
    return [super respondsToSelector:aSelector];
}

@end
