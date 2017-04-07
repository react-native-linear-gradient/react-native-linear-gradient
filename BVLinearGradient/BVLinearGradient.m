#import "BVLinearGradient.h"
#import <React/RCTConvert.h>
#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

@implementation BVLinearGradient

@synthesize start = _start;
@synthesize end = _end;
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
  // CGGradientCreateWithColors accepts locations as a C array
  if (_locations) {
    free(_locations);
    _locations = NULL;
  }
  if (locations) {
    NSUInteger count = [locations count];
    _locations = malloc(sizeof(CGFloat *) * count);
    for (int i = 0; i < count; ++i) {
        _locations[i] = [[locations objectAtIndex:i] doubleValue];
    }
  }
  [self setNeedsDisplay];
}

- (CGFloat *)locations
{
  return _locations;
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

  CGGradientRef gradient = CGGradientCreateWithColors(
    colorSpace,
    (CFArrayRef)self.colors,
    self.locations
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

- (void)dealloc
{
  if (_locations) {
    free(_locations);
  }
}

@end
