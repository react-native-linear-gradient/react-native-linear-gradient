#include "pch.h"
#include "JSValueXaml.h"
#include "BVLinearGradient.h"
#include "BVLinearGradientModule.g.cpp"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Data::Json;
    using namespace Windows::Foundation;
    using namespace Windows::UI;
    using namespace Windows::UI::Popups;
    using namespace Windows::UI::Xaml;
    using namespace Windows::UI::Xaml::Controls;
    using namespace Windows::UI::Xaml::Input;
    using namespace Windows::UI::Xaml::Media;
} // namespace winrt

namespace winrt::BVLinearGradient::implementation {

    BVLinearGradientModule::BVLinearGradientModule(winrt::IReactContext const& reactContext)
        : m_reactContext(reactContext) {
        Background(m_linearGradientBrush);
    }

    winrt::Windows::Foundation::Collections::IMapView<winrt::hstring, winrt::Microsoft::ReactNative::ViewManagerPropertyType>
    BVLinearGradientModule::NativeProps() noexcept {
        auto nativeProps = winrt::single_threaded_map<hstring, ViewManagerPropertyType>();
        nativeProps.Insert(L"startPoint", ViewManagerPropertyType::Map);
        nativeProps.Insert(L"endPoint", ViewManagerPropertyType::Map);
        nativeProps.Insert(L"colors", ViewManagerPropertyType::Array);
        nativeProps.Insert(L"locations", ViewManagerPropertyType::Array);
        return nativeProps.GetView();
    }

    void BVLinearGradientModule::UpdateProperties(winrt::Microsoft::ReactNative::IJSValueReader const& propertyMapReader) noexcept {
        const JSValueObject &propertyMap = JSValue::ReadObjectFrom(propertyMapReader);
        for (auto const &pair : propertyMap) {
            auto const &propertyName = pair.first;
            auto const &propertyValue = pair.second;
            if (propertyValue != nullptr) {
                if (propertyName == "colors") {
                    auto& colorArray = propertyValue.AsArray();
                    double increment = ((float)1 / colorArray.size());
                    uint32_t index = 0;

                    for (auto& colorValue : colorArray) {
                        auto colorAsInt = (uint32_t)colorValue.AsInt64();

                        Color color{};
                        color.R = ((uint8_t*)&colorAsInt)[2];
                        color.G = ((uint8_t*)&colorAsInt)[1];
                        color.B = ((uint8_t*)&colorAsInt)[0];
                        color.A = ((uint8_t*)&colorAsInt)[3];

                        if (m_gradientStopCollection.Size() > index) {
                            GradientStop stop = m_gradientStopCollection.GetAt(index);
                            stop.Color(color);
                        } else {
                            GradientStop stop{};
                            stop.Color(color);
                            stop.Offset(increment * index);
                            m_gradientStopCollection.Append(stop);
                        }

                        m_linearGradientBrush.GradientStops(m_gradientStopCollection);
                        index++;
                    }
                } else if (propertyName == "startPoint") {
                    auto& start = propertyValue.AsObject();
                    auto x = start["x"].AsDouble();
                    auto y = start["y"].AsDouble();
                    m_linearGradientBrush.StartPoint(Point((float)x, (float)y));
                } else if (propertyName == "endPoint") {
                    auto& end = propertyValue.AsObject();
                    auto x = end["x"].AsDouble();
                    auto y = end["y"].AsDouble();
                    m_linearGradientBrush.EndPoint(Point((float)x, (float)y));
                } else if (propertyName == "locations") {
                    uint32_t index = 0;
                    for (auto& location : propertyValue.AsArray()) {
                        if (m_gradientStopCollection.Size() > index) {
                            GradientStop stop = m_gradientStopCollection.GetAt(index);
                            stop.Offset(location.AsDouble());
                        } else {
                            GradientStop stop{};
                            stop.Offset(location.AsDouble());
                            m_gradientStopCollection.Append(stop);
                        }
                        index++;
                    }
                }
            }
        }
    }

    winrt::Microsoft::ReactNative::ConstantProviderDelegate BVLinearGradientModule::ExportedCustomBubblingEventTypeConstants() noexcept {
        return nullptr;
    }

    winrt::Microsoft::ReactNative::ConstantProviderDelegate BVLinearGradientModule::ExportedCustomDirectEventTypeConstants() noexcept {
        return nullptr;
    }

    winrt::Windows::Foundation::Collections::IVectorView<winrt::hstring> BVLinearGradientModule::Commands() noexcept {
        auto commands = winrt::single_threaded_vector<hstring>();
        return commands.GetView();
    }

    void BVLinearGradientModule::DispatchCommand(winrt::hstring const &, winrt::Microsoft::ReactNative::IJSValueReader const &) noexcept {
    }
}
