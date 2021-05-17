#pragma once

#include "pch.h"
#include "winrt/Microsoft.ReactNative.h"
#include "NativeModules.h"
#include "BVLinearGradientModule.g.h"

namespace winrt::BVLinearGradient::implementation {

    class BVLinearGradientModule : public BVLinearGradientModuleT<BVLinearGradientModule> {
    public:
        BVLinearGradientModule(Microsoft::ReactNative::IReactContext const& reactContext);

        static winrt::Windows::Foundation::Collections::
            IMapView<winrt::hstring, winrt::Microsoft::ReactNative::ViewManagerPropertyType>
            NativeProps() noexcept;
        void UpdateProperties(winrt::Microsoft::ReactNative::IJSValueReader const& propertyMapReader) noexcept;

        static winrt::Microsoft::ReactNative::ConstantProviderDelegate
            ExportedCustomBubblingEventTypeConstants() noexcept;
        static winrt::Microsoft::ReactNative::ConstantProviderDelegate
            ExportedCustomDirectEventTypeConstants() noexcept;

        static winrt::Windows::Foundation::Collections::IVectorView<winrt::hstring> Commands() noexcept;
        void DispatchCommand(
            winrt::hstring const &commandId,
            winrt::Microsoft::ReactNative::IJSValueReader const &commandArgsReader) noexcept;

    private:
        winrt::Windows::UI::Xaml::Media::LinearGradientBrush m_linearGradientBrush{ };
        winrt::Windows::UI::Xaml::Media::GradientStopCollection m_gradientStopCollection{ };
        Microsoft::ReactNative::IReactContext m_reactContext{ nullptr };
    };
}

namespace winrt::BVLinearGradient::factory_implementation {
    struct BVLinearGradientModule : BVLinearGradientModuleT<BVLinearGradientModule, implementation::BVLinearGradientModule> {};
}
