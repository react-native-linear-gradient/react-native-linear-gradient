#pragma once
#include "ReactPackageProvider.g.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::BVLinearGradient::implementation {
  struct ReactPackageProvider : ReactPackageProviderT<ReactPackageProvider> {
    ReactPackageProvider() = default;
    void CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept;
  };
}

namespace winrt::BVLinearGradient::factory_implementation {
  struct ReactPackageProvider : ReactPackageProviderT<ReactPackageProvider, implementation::ReactPackageProvider> {};
}

