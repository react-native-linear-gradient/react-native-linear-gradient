#import <UIKit/UIKit.h>

@interface BVLinearGradient : UIView {
  CGFloat *_locations;
}

- (CGFloat *)locations;
- (void)setLocations:(NSArray *)colorStrings;

@property (nonatomic, retain) NSArray *colors;
@property (nonatomic, assign) CGPoint start;
@property (nonatomic, assign) CGPoint end;

@end
