#include "pch.h"
#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#  include "ReactPackageProvider.g.cpp"
#endif

#include "BVLinearGradientViewManager.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::BVLinearGradient::implementation {
  void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept {
    packageBuilder.AddViewManager(L"BVLinearGradientViewManager", []() { return winrt::make<BVLinearGradientViewManager>(); });
  }
}
