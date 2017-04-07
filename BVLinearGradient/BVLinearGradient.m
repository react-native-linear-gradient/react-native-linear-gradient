#import "BVLinearGradient.h"
#import <React/RCTConvert.h>
#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

@implementation BVLinearGradient

@synthesize start = _start;
@synthesize end = _end;
@synthesize locations = _locations;
@synthesize colors = _colors;

- (void)invalidate
{
  [self setNeedsDisplay];
}

- (void)setStart:(CGPoint)start
{
  _start = start;
  [self setNeedsDisplay];
}

- (void)setEnd:(CGPoint)end
{
  _end = end;
  [self setNeedsDisplay];
}

- (void)setLocations:(NSArray *)locations
{
  _locations = locations;
  [self setNeedsDisplay];
}

- (void)setColors:(NSArray *)colorStrings
{
  NSMutableArray *colors = [NSMutableArray arrayWithCapacity:colorStrings.count];
  for (NSString *colorString in colorStrings) {
    [colors addObject:(id)[RCTConvert UIColor:colorString].CGColor];
  }
  _colors = colors;
  [self setNeedsDisplay];
}

- (void)drawRect:(CGRect)rect
{
  [super drawRect:rect];

  CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
  CGContextRef context = UIGraphicsGetCurrentContext();

  // CGGradientCreateWithColors accepts locations as a C array
  int count = [self.locations count];
  CGFloat locArray[count];
  for (int i = 0; i < count; ++i) {
      locArray[i] = [[self.locations objectAtIndex:i] doubleValue];
  }

  CGGradientRef gradient = CGGradientCreateWithColors(
    colorSpace,
    (CFArrayRef)self.colors,
    locArray
  );

  CGContextDrawLinearGradient(
    context,
    gradient,
    CGPointMake(self.start.x * self.bounds.size.width, self.start.y * self.bounds.size.height),
    CGPointMake(self.end.x * self.bounds.size.width, self.end.y * self.bounds.size.height),
    kCGGradientDrawsBeforeStartLocation | kCGGradientDrawsAfterEndLocation
  );

  CGColorSpaceRelease(colorSpace);
  CGGradientRelease(gradient);
}

@end
