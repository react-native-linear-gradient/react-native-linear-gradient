#import "BVLinearGradientManager.h"
#import "BVLinearGradient.h"
#import <React/RCTBridge.h>

@implementation BVLinearGradientManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
  return [[BVLinearGradient alloc] init];
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(colors, NSArray);
RCT_EXPORT_VIEW_PROPERTY(startPosition, CGPoint);
RCT_EXPORT_VIEW_PROPERTY(endPosition, CGPoint);
RCT_EXPORT_VIEW_PROPERTY(locations, NSArray);

@end
