using Newtonsoft.Json.Linq;
using ReactNative.UIManager;
using ReactNative.UIManager.Annotations;
using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace LinearGradient
{
    class LinearGradientManager : ViewParentManager<Canvas>
    {
        public const String REACT_CLASS = "BVLinearGradient";
        public const String PROP_COLORS = "colors";
        public const String PROP_LOCATIONS = "locations";
        public const String PROP_START_POS = "start";
        public const String PROP_END_POS = "end";

        private LinearGradientBrush _linearGradient;
        private Canvas _canvas;

        public override string Name
        {
            get
            {
                return REACT_CLASS;
            }
        }

        protected override Canvas CreateViewInstance(ThemedReactContext reactContext)
        {
            _canvas = new Canvas();
            _linearGradient = new LinearGradientBrush
            {
                SpreadMethod = GradientSpreadMethod.Pad
            };
            _canvas.Background = _linearGradient;
            return _canvas;
        }

        [ReactProp(PROP_COLORS)]
        public void setColors(Canvas linearGradient, List<string> colors)
        {
            GradientStopCollection stops = _linearGradient.GradientStops;
            for (int i = 0; i < colors.Count; i++)
            {
                GradientStop stop = i < stops.Count ? stops[i] : new GradientStop();
                stop.Color = ColorHelpers.Parse(Convert.ToUInt32(colors[i]));
                if (i < stops.Count) stops.RemoveAt(i);
                stops.Insert(i, stop);
            }
            _linearGradient.GradientStops = stops;
        }

        [ReactProp(PROP_LOCATIONS)]
        public void setLocations(Canvas linearGradient, List<float> locations)
        {
            if (locations != null)
            {
                GradientStopCollection stops = _linearGradient.GradientStops;
                for (int i = 0; i < locations.Count; i++)
                {
                    GradientStop stop = i < stops.Count ? stops[i] : new GradientStop();
                    stop.Offset = locations[i];
                    if (i < stops.Count) stops.RemoveAt(i);
                    stops.Insert(i, stop);
                }
                _linearGradient.GradientStops = stops;
            }
        }

        [ReactProp(PROP_START_POS)]
        public void setStartPosition(Canvas linearGradient, JObject startPos)
        {
            _linearGradient.StartPoint = new Point(startPos.Value<float>("x"), startPos.Value<float>("y"));
        }

        [ReactProp(PROP_END_POS)]
        public void setEndPosition(Canvas linearGradient, JObject endPos)
        {
            _linearGradient.EndPoint = new Point(endPos.Value<float>("x"), endPos.Value<float>("y"));
        }

        public override void AddView(Canvas parent, DependencyObject child, int index)
        {
            parent.Children.Insert(index, (UIElement)child);
        }

        public override int GetChildCount(Canvas parent)
        {
            return parent.Children.Count;
        }

        public override DependencyObject GetChildAt(Canvas parent, int index)
        {
            return (FrameworkElement)parent.Children[index];
        }

        public override void RemoveChildAt(Canvas parent, int index)
        {
            parent.Children.RemoveAt(index);
        }

        public override void RemoveAllChildren(Canvas parent)
        {
            parent.Children.Clear();
        }
    }
}
