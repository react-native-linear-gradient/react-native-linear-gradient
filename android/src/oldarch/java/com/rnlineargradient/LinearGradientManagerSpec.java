package com.rnlineargradient;

import android.view.View;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;

public abstract class LinearGradientManagerSpec<T extends View> extends SimpleViewManager<T> {
    public abstract void setStartPoint(T view, @Nullable ReadableMap startPoint);

    public abstract void setEndPoint(T view, @Nullable ReadableMap endPoint);

    public abstract void setColors(T view, @Nullable ReadableArray colors);

    public abstract void setLocations(T view, @Nullable ReadableArray locations);

    public abstract void setUseAngle(T view, boolean useAngle);

    public abstract void setAngleCenter(T view, @Nullable ReadableMap angleCenter);

    public abstract void setAngle(T view, float angle);

    public abstract void setBorderRadii(T view, @Nullable ReadableArray borderRadii);
}
