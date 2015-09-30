package com.BV.LinearGradient;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Shader;
import android.view.View;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.CatalystStylesDiffMap;


public class LinearGradientView extends View {

    public static Paint mPaint;
    public static LinearGradient mShader;
    public static float[] mPositions;
    public static int[] mColors;

    public LinearGradientView(Context context, CatalystStylesDiffMap props) {
        super(context, null);
        ReadableArray colors = props.getArray("colors");

        try{
            ReadableArray positions = props.getArray("positions");
            mPositions= new float[positions.size()];
            for (int i=0; i < mPositions.length; i++)
            {
                mPositions[i] = (float) positions.getDouble(i);
            }
        } catch (Exception e) {
            mPositions = null;
        }


        assert colors != null;
        mColors = new int[colors.size()];
        for (int i=0; i < mColors.length; i++)
        {
            mColors[i] = colors.getInt(i);
        }


        mPaint = new Paint();
        updateGradient(getMeasuredHeight(), mColors, mPositions);
    }


    public void updateColors(ReadableArray colors){
        mColors = new int[colors.size()];
        for (int i=0; i < mColors.length; i++)
        {
            mColors[i] = colors.getInt(i);
        }
        updateGradient(getMeasuredHeight(), mColors, mPositions);
    }

    public void updatePositions(ReadableArray positions){
        try {
            assert positions != null;
            mPositions= new float[positions.size()];
            for (int i=0; i < mPositions.length; i++)
            {
                mPositions[i] = (float) positions.getDouble(i);
            }
        } catch (Exception e) {
            mPositions = null;
        }
        updateGradient(getMeasuredHeight(), mColors, mPositions);
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh){
        updateGradient(h, mColors, mPositions);
    }

    private void updateGradient(int height, int[] colors, float[] positions) {
        mShader = new LinearGradient(0, 0, 0, height, colors, positions, Shader.TileMode.MIRROR);
        mPaint.setShader(mShader);
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawPaint(mPaint);
    }
}
