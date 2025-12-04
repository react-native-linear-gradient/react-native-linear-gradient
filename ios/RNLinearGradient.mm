#import "RNLinearGradient.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConversions.h>
#import <React/RCTConvert.h>
#import <react/renderer/components/RNLinearGradientSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNLinearGradientSpec/EventEmitters.h>
#import <react/renderer/components/RNLinearGradientSpec/Props.h>
#import <react/renderer/components/RNLinearGradientSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#endif

#import <QuartzCore/QuartzCore.h>
#import <React/RCTConvert.h>
#import <UIKit/UIKit.h>

#import "RNLinearGradientLayer.h"

#ifdef RCT_NEW_ARCH_ENABLED
using namespace facebook::react;

@interface RNLinearGradient () <RCTRNLinearGradientViewProtocol>

@end
#endif

@implementation RNLinearGradient

+ (Class)layerClass {
    return [RNLinearGradientLayer class];
}

- (RNLinearGradientLayer *)gradientLayer {
    return (RNLinearGradientLayer *)self.layer;
}

- (NSArray *)colors {
    return self.gradientLayer.colors;
}

- (void)setColors:(NSArray *)colorStrings {
    NSMutableArray *colors = [NSMutableArray arrayWithCapacity:colorStrings.count];
    for (NSString *colorString in colorStrings) {
        if ([colorString isKindOfClass:UIColor.class]) {
            [colors addObject:(UIColor *)colorString];
        } else {
            [colors addObject:[RCTConvert UIColor:colorString]];
        }
    }
    self.gradientLayer.colors = colors;
}

- (CGPoint)startPoint {
    return self.gradientLayer.startPoint;
}

- (void)setStartPoint:(CGPoint)startPoint {
    self.gradientLayer.startPoint = startPoint;
}

- (CGPoint)endPoint {
    return self.gradientLayer.endPoint;
}

- (void)setEndPoint:(CGPoint)endPoint {
    self.gradientLayer.endPoint = endPoint;
}

- (NSArray *)locations {
    return self.gradientLayer.locations;
}

- (void)setLocations:(NSArray *)locations {
    self.gradientLayer.locations = locations;
}

- (BOOL)useAngle {
    return self.gradientLayer.useAngle;
}

- (void)setUseAngle:(BOOL)useAngle {
    self.gradientLayer.useAngle = useAngle;
}

- (CGPoint)angleCenter {
    return self.gradientLayer.angleCenter;
}

- (void)setAngleCenter:(CGPoint)angleCenter {
    self.gradientLayer.angleCenter = angleCenter;
}

- (CGFloat)angle {
    return self.gradientLayer.angle;
}

- (void)setAngle:(CGFloat)angle {
    self.gradientLayer.angle = angle;
}

#ifdef RCT_NEW_ARCH_ENABLED

+ (ComponentDescriptorProvider)componentDescriptorProvider {
    return concreteComponentDescriptorProvider<RNLinearGradientComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RNLinearGradientProps>();
        _props = defaultProps;
    }

    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
    const auto &oldViewProps = *std::static_pointer_cast<RNLinearGradientProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNLinearGradientProps const>(props);

    if (oldViewProps.startPoint.x != newViewProps.startPoint.x ||
        oldViewProps.startPoint.y != newViewProps.startPoint.y) {
        self.startPoint = CGPointMake(newViewProps.startPoint.x, newViewProps.startPoint.y);
    }

    if (oldViewProps.endPoint.x != newViewProps.endPoint.x ||
        oldViewProps.endPoint.y != newViewProps.endPoint.y) {
        self.endPoint = CGPointMake(newViewProps.endPoint.x, newViewProps.endPoint.y);
    }

    if (oldViewProps.useAngle != newViewProps.useAngle) {
        self.useAngle = newViewProps.useAngle;
    }

    if (oldViewProps.angle != newViewProps.angle) {
        self.angle = CGFloat(newViewProps.angle);
    }

    if (oldViewProps.angleCenter.x != newViewProps.angleCenter.x ||
        oldViewProps.angleCenter.y != newViewProps.angleCenter.y) {
        self.angleCenter = CGPointMake(newViewProps.angleCenter.x, newViewProps.angleCenter.y);
    }

    NSArray<NSNumber *> *locations = convertCxxVectorNumberToNsArrayNumber(newViewProps.locations);
    self.locations = locations;

    // We cannot compare SharedColor because it is shared value.
    // We could compare color value, but it is more performant to just assign new value
    NSArray<UIColor *> *colors = convertCxxVectorColorsToNSArrayColors(newViewProps.colors);
    self.colors = colors;

    [super updateProps:props oldProps:oldProps];
}

static NSArray<UIColor *> *
convertCxxVectorColorsToNSArrayColors(const std::vector<facebook::react::SharedColor> &colors) {
    size_t size = colors.size();
    NSLog(@"%zu", size);
    NSMutableArray *result = [NSMutableArray new];
    for (size_t i = 0; i < size; i++) {
        UIColor *color = RCTUIColorFromSharedColor(colors[i]);
        [result addObject:color];
    }
    return [result copy];
}

static NSArray<NSNumber *> *convertCxxVectorNumberToNsArrayNumber(const std::vector<Float> &value) {
    size_t size = value.size();
    NSMutableArray *result = [NSMutableArray new];
    for (size_t i = 0; i < size; i++) {
        NSNumber *number = @(value[i]);
        [result addObject:number];
    }
    return [result copy];
}

Class<RCTComponentViewProtocol> RNLinearGradientCls(void) { return RNLinearGradient.class; }

#endif

@end
