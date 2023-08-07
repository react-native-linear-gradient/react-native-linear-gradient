#include "pch.h"
#include "NativeModules.h"
#include "JSValueXaml.h"
#include "RNLinearGradientViewManager.h"
#include "RNLinearGradient.h"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Foundation;
    using namespace Windows::Foundation::Collections;
    using namespace Windows::UI;
    using namespace Windows::UI::Xaml;
    using namespace Windows::UI::Xaml::Controls;
}

namespace winrt::RNLinearGradient::implementation {
    // IViewManager
    winrt::hstring RNLinearGradientViewManager::Name() noexcept {
        return L"RNLinearGradient";
    }

    winrt::FrameworkElement RNLinearGradientViewManager::CreateView() noexcept {
        return winrt::RNLinearGradient::RNLinearGradientModule(m_reactContext);
    }

    // IViewManagerWithReactContext
    winrt::IReactContext RNLinearGradientViewManager::ReactContext() noexcept {
        return m_reactContext;
    }

    void RNLinearGradientViewManager::ReactContext(IReactContext reactContext) noexcept {
        m_reactContext = reactContext;
    }

    // IViewManagerWithNativeProperties
    IMapView<hstring, ViewManagerPropertyType> RNLinearGradientViewManager::NativeProps() noexcept {
        return winrt::RNLinearGradient::implementation::RNLinearGradientModule::NativeProps();
    }

    void RNLinearGradientViewManager::UpdateProperties(
        FrameworkElement const& view,
        IJSValueReader const& propertyMapReader) noexcept {
         if (auto module = view.try_as<winrt::RNLinearGradient::RNLinearGradientModule>()) {
            module.UpdateProperties(propertyMapReader);
        }
    }
    // IViewManagerWithExportedEventTypeConstants
    ConstantProviderDelegate RNLinearGradientViewManager::ExportedCustomBubblingEventTypeConstants() noexcept {
        return winrt::RNLinearGradient::implementation::RNLinearGradientModule::ExportedCustomBubblingEventTypeConstants();
    }

    ConstantProviderDelegate RNLinearGradientViewManager::ExportedCustomDirectEventTypeConstants() noexcept {
       return winrt::RNLinearGradient::implementation::RNLinearGradientModule::ExportedCustomDirectEventTypeConstants();
    }

    // IViewManagerWithCommands
    IVectorView<hstring> RNLinearGradientViewManager::Commands() noexcept {
        return winrt::RNLinearGradient::implementation::RNLinearGradientModule::Commands();
    }

    void RNLinearGradientViewManager::DispatchCommand(
        FrameworkElement const& view,
        winrt::hstring const& commandId,
        winrt::IJSValueReader const& commandArgsReader) noexcept {
        if (auto module = view.try_as<winrt::RNLinearGradient::RNLinearGradientModule>()) {
            module.DispatchCommand(commandId, commandArgsReader);
        }
    }
}
