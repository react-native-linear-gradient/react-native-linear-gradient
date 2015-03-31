#import "BVLinearGradientManager.h"
#import "BVLinearGradient.h"
#import "RCTBridge.h"

@implementation BVLinearGradientManager

@synthesize bridge = _bridge;

- (UIView *)view
{
  return [[BVLinearGradient alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(colors, NSArray);
// Start point, end point

- (NSDictionary *)constantsToExport
{
  return @{};
}

@end
