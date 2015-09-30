package com.BV.LinearGradient;

import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.BaseViewPropertyApplicator;
import com.facebook.react.uimanager.CatalystStylesDiffMap;
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class LinearGradientManager extends SimpleViewManager<FrameLayout> {

    public static final String REACT_CLASS = "BVLinearGradient";
    public static final String PROP_COLORS = "colors";
    public static final String PROP_POSITIONS = "positions";

    public LinearGradientView mGradientView;


    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected FrameLayout createViewInstance(ThemedReactContext context) {
        return new FrameLayout(context);
    }

    @ReactProp(name=PROP_COLORS)
    public void updateColors(FrameLayout frame, ReadableArray colors){
        if(mGradientView != null) {
            mGradientView.updateColors(colors);
        }
    }

    @ReactProp(name=PROP_POSITIONS)
    public void updatePositions(FrameLayout frame, ReadableArray positions){
        if(mGradientView != null) {
            mGradientView.updatePositions(positions);
        }
    }

    //I'd like to not do this this way.
    @Override
    public void updateView(FrameLayout frame, CatalystStylesDiffMap props) {
        BaseViewPropertyApplicator.applyCommonViewProperties(frame, props);

        frame.removeAllViews();

        mGradientView = new LinearGradientView(frame.getContext(), props);
        mGradientView.setId(View.generateViewId());

        frame.addView(mGradientView);
    }
}
