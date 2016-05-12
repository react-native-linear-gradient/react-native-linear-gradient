require 'json'
version = JSON.parse(File.read('package.json'))["version"]

Pod::Spec.new do |s|

  s.name            = "BVLinearGradient"
  s.version         = version
  s.homepage        = "https://github.com/brentvatne/react-native-linear-gradient"
  s.summary         = "A <LinearGradient /> component for react-native"
  s.license         = "MIT"
  s.author          = { "Brent Vatne" => "brentvatne@gmail.com" }
  s.platform        = :ios, "7.0"
  s.source          = { :git => "https://github.com/brentvatne/react-native-linear-gradient.git", :tag => "#{s.version}" }
  s.source_files    = 'BVLinearGradient/*.{h,m}'
  s.preserve_paths  = "**/*.js"
  
  s.dependency 'React'

end
