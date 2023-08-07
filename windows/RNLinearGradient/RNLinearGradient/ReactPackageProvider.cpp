#include "pch.h"
#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#  include "ReactPackageProvider.g.cpp"
#endif

#include "RNLinearGradientViewManager.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::RNLinearGradient::implementation {
  void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept {
    packageBuilder.AddViewManager(L"RNLinearGradientViewManager", []() { return winrt::make<RNLinearGradientViewManager>(); });
  }
}
