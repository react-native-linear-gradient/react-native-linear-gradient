using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using ReactNative.UIManager;

namespace LinearGradient
{
    class LinearGradientView : Canvas
    {
        private LinearGradientBrush _linearGradient;
        private Canvas _canvas;

        public LinearGradientView() : base()
        {
            _linearGradient = new LinearGradientBrush
            {
                SpreadMethod = GradientSpreadMethod.Pad
            };
            Background = _linearGradient;
        }

        public void setColors(List<string> colors)
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

        public void setLocations(List<float> locations)
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

        public void setStartPosition(float x, float y)
        {
            _linearGradient.StartPoint = new Point(x, y);
        }

        public void setEndPosition(float x, float y)
        {
            _linearGradient.EndPoint = new Point(x, y);
        }
    }
}
