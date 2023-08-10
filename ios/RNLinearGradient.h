#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>

@interface RNLinearGradient : RCTViewComponentView
#else
#import <React/RCTView.h>

@interface RNLinearGradient : RCTView
#endif

@property (nullable, nonatomic, copy) NSArray<UIColor *> *colors;
@property (nullable, nonatomic, copy) NSArray<NSNumber *> *locations;
@property (nonatomic) CGPoint startPoint;
@property (nonatomic) CGPoint endPoint;
@property (nonatomic) BOOL useAngle;
@property (nonatomic) CGPoint angleCenter;
@property (nonatomic) CGFloat angle;

@end
