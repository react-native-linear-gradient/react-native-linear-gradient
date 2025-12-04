#import "RNLinearGradientManager.h"
#import "RNLinearGradient.h"
#import <React/RCTBridge.h>

@implementation RNLinearGradientManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view {
    return [[RNLinearGradient alloc] init];
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(colors, NSArray);
RCT_EXPORT_VIEW_PROPERTY(startPoint, CGPoint);
RCT_EXPORT_VIEW_PROPERTY(endPoint, CGPoint);
RCT_EXPORT_VIEW_PROPERTY(locations, NSArray);
RCT_EXPORT_VIEW_PROPERTY(useAngle, BOOL);
RCT_EXPORT_VIEW_PROPERTY(angleCenter, CGPoint);
RCT_EXPORT_VIEW_PROPERTY(angle, CGFloat);

@end
