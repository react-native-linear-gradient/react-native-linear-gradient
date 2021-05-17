#include "pch.h"
#include "NativeModules.h"
#include "JSValueXaml.h"
#include "BVLinearGradientViewManager.h"
#include "BVLinearGradient.h"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Foundation;
    using namespace Windows::Foundation::Collections;
    using namespace Windows::UI;
    using namespace Windows::UI::Xaml;
    using namespace Windows::UI::Xaml::Controls;
}

namespace winrt::BVLinearGradient::implementation {
    // IViewManager
    winrt::hstring BVLinearGradientViewManager::Name() noexcept {
        return L"BVLinearGradient";
    }

    winrt::FrameworkElement BVLinearGradientViewManager::CreateView() noexcept {
        return winrt::BVLinearGradient::BVLinearGradientModule(m_reactContext);
    }

    // IViewManagerWithReactContext
    winrt::IReactContext BVLinearGradientViewManager::ReactContext() noexcept {
        return m_reactContext;
    }

    void BVLinearGradientViewManager::ReactContext(IReactContext reactContext) noexcept {
        m_reactContext = reactContext;
    }

    // IViewManagerWithNativeProperties
    IMapView<hstring, ViewManagerPropertyType> BVLinearGradientViewManager::NativeProps() noexcept {
        return winrt::BVLinearGradient::implementation::BVLinearGradientModule::NativeProps();
    }

    void BVLinearGradientViewManager::UpdateProperties(
        FrameworkElement const& view,
        IJSValueReader const& propertyMapReader) noexcept {
         if (auto module = view.try_as<winrt::BVLinearGradient::BVLinearGradientModule>()) {
            module.UpdateProperties(propertyMapReader);
        }
    }
    // IViewManagerWithExportedEventTypeConstants
    ConstantProviderDelegate BVLinearGradientViewManager::ExportedCustomBubblingEventTypeConstants() noexcept {
        return winrt::BVLinearGradient::implementation::BVLinearGradientModule::ExportedCustomBubblingEventTypeConstants();
    }

    ConstantProviderDelegate BVLinearGradientViewManager::ExportedCustomDirectEventTypeConstants() noexcept {
       return winrt::BVLinearGradient::implementation::BVLinearGradientModule::ExportedCustomDirectEventTypeConstants();
    }

    // IViewManagerWithCommands
    IVectorView<hstring> BVLinearGradientViewManager::Commands() noexcept {
        return winrt::BVLinearGradient::implementation::BVLinearGradientModule::Commands();
    }

    void BVLinearGradientViewManager::DispatchCommand(
        FrameworkElement const& view,
        winrt::hstring const& commandId,
        winrt::IJSValueReader const& commandArgsReader) noexcept {
        if (auto module = view.try_as<winrt::BVLinearGradient::BVLinearGradientModule>()) {
            module.DispatchCommand(commandId, commandArgsReader);
        }
    }
}
