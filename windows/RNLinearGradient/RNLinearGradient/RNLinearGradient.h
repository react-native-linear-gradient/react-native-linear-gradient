#pragma once

#include "pch.h"
#include "winrt/Microsoft.ReactNative.h"
#include "NativeModules.h"
#include "RNLinearGradientModule.g.h"

namespace winrt::RNLinearGradient::implementation {

    class RNLinearGradientModule : public RNLinearGradientModuleT<RNLinearGradientModule> {
    public:
        RNLinearGradientModule(Microsoft::ReactNative::IReactContext const& reactContext);

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

namespace winrt::RNLinearGradient::factory_implementation {
    struct RNLinearGradientModule : RNLinearGradientModuleT<RNLinearGradientModule, implementation::RNLinearGradientModule> {};
}
