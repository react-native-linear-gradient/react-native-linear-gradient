package com.BV.LinearGradient;

import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.BaseViewPropertyApplicator;
import com.facebook.react.uimanager.CatalystStylesDiffMap;
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

public class LinearGradientManager extends SimpleViewManager<FrameLayout> {

    public static final String REACT_CLASS = "BVLinearGradient";
    public static final String PROP_COLORS = "colors";
    public static final String PROP_LOCATIONS = "locations";
    public static final String PROP_START_POS = "start";
    public static final String PROP_END_POS = "end";

    public LinearGradientView mGradientView;


    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected FrameLayout createViewInstance(ThemedReactContext context) {
        WritableMap defaults = new WritableNativeMap();
        WritableArray array = new WritableNativeArray();
        array.pushInt(0);
        array.pushInt(0);

        defaults.putArray("colors", array);

        mGradientView = new LinearGradientView(context, new CatalystStylesDiffMap(defaults));

        FrameLayout frame = new FrameLayout(context);

        frame.removeAllViews();
        frame.addView(mGradientView);

        return frame;
    }

    @ReactProp(name=PROP_COLORS)
    public void updateColors(FrameLayout frame, ReadableArray colors){
        if(mGradientView != null) {
            mGradientView.updateColors(colors);
        }
    }

    @ReactProp(name=PROP_LOCATIONS)
    public void updatePositions(FrameLayout frame, ReadableArray locations){
        if(mGradientView != null) {
            mGradientView.updateLocations(locations);
        }
    }

    @ReactProp(name=PROP_START_POS)
    public void updateStartPosition(FrameLayout frame, ReadableArray startPos){
        if(mGradientView != null) {
            mGradientView.updateStartPosition(startPos);
        }
    }

    @ReactProp(name=PROP_END_POS)
    public void updateEndPosition(FrameLayout frame, ReadableArray endPos){
        if(mGradientView != null) {
            mGradientView.updateEndPosition(endPos);
        }
    }
}
