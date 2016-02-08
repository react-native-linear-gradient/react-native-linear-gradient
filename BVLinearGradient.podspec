Pod::Spec.new do |s|

  s.name         = "BVLinearGradient"
  s.version      = "1.5.0"
  s.homepage     = "https://github.com/brentvatne/react-native-linear-gradient"
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/brentvatne/react-native-linear-gradient.git", :tag => "#{s.version}" }
  s.source_files = 'BVLinearGradient/*.{h,m}'
  s.preserve_paths = "**/*.js"
  s.dependency 'React'

end
