using ReactNative.UIManager;
using System;
using System.Collections.Generic;
using System.Windows.Media;
using Newtonsoft.Json.Linq;
using ReactNative.UIManager.Annotations;

namespace LinearGradient
{
    class LinearGradientManager : SimpleViewManager<LinearGradientView>
    {
        public const String REACT_CLASS = "BVLinearGradient";
        public const String PROP_COLORS = "colors";
        public const String PROP_LOCATIONS = "locations";
        public const String PROP_START_POS = "start";
        public const String PROP_END_POS = "end";

        private LinearGradientBrush _linearGradient;

        public override string Name
        {
            get
            {
                return REACT_CLASS;
            }
        }

        protected override LinearGradientView CreateViewInstance(ThemedReactContext reactContext)
        {
            return new LinearGradientView();
        }

        [ReactProp(PROP_COLORS)]
        public void setColors(LinearGradientView linearGradient, List<string> colors)
        {
            linearGradient.setColors(colors);
        }

        [ReactProp(PROP_LOCATIONS)]
        public void setLocations(LinearGradientView linearGradient, List<float> locations)
        {
            if (locations != null)
            {
                linearGradient.setLocations(locations);
            }
        }

        [ReactProp(PROP_START_POS)]
        public void setStartPosition(LinearGradientView linearGradient, JObject startPos)
        {
            linearGradient.setStartPosition(startPos.Value<float>("x"), startPos.Value<float>("y"));
        }

        [ReactProp(PROP_END_POS)]
        public void setEndPosition(LinearGradientView linearGradient, JObject endPos)
        {
            linearGradient.setEndPosition(endPos.Value<float>("x"), endPos.Value<float>("y"));
        }
    }
}
