#import "BVLinearGradient.h"

@implementation BVLinearGradient
{
  CAGradientLayer *_layer;
}

- (id)init
{
  if ((self = [super init])) {
    NSArray *colors = [NSArray arrayWithObjects:
                       (id)[UIColor whiteColor].CGColor,
                       (id)[UIColor redColor].CGColor,
                       nil];
    *_layer = [CAGradientLayer _layer];
    [_layer setColors:colors];
    [layer setFrame:self.bounds];
    [self.layer insertSublayer:_layer atIndex:0];
    self.clipToBounds = YES; 
  }
  return self;
}

- (void)setColors:(NSArray *)colors
{
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  [layer setFrame:self.bounds];
}

@end
