package com.rnlineargradient;

import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.RNLinearGradientManagerDelegate;
import com.facebook.react.viewmanagers.RNLinearGradientManagerInterface;

public abstract class LinearGradientManagerSpec<T extends View> extends SimpleViewManager<T>
        implements RNLinearGradientManagerInterface<T> {
    private final ViewManagerDelegate<T> mDelegate;

    public LinearGradientManagerSpec() {
        mDelegate = new RNLinearGradientManagerDelegate<>(this);
    }

    @Override
    protected ViewManagerDelegate<T> getDelegate() {
        return mDelegate;
    }
}
