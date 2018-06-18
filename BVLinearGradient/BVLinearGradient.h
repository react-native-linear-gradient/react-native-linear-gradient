#import <UIKit/UIKit.h>
#import <React/RCTView.h>

@interface BVLinearGradient : RCTView

@property (nullable, nonatomic, strong) NSArray *colors;
@property (nullable, nonatomic, strong) NSArray<NSNumber *> *locations;
@property (nonatomic) CGPoint startPoint;
@property (nonatomic) CGPoint endPoint;

@end
