#import <UIKit/UIKit.h>

@interface BVLinearGradient : UIView

@property (nonatomic, retain) NSArray *colors;
@property (nonatomic, retain) NSArray *locations;
@property (nonatomic, assign) CGPoint start;
@property (nonatomic, assign) CGPoint end;

@end
