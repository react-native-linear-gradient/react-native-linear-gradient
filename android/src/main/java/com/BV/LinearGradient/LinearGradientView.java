package com.BV.LinearGradient;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Shader;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.CatalystStylesDiffMap;


public class LinearGradientView extends View {

    private Paint mPaint;
    private LinearGradient mShader;
    private float[] mLocations;
    private float[] mStartPos;
    private float[] mEndPos;
    private int[] mColors;
    private int[] mSize;

    public LinearGradientView(Context context, CatalystStylesDiffMap props) {
        super(context, null);

        mPaint = new Paint();

        ReadableArray colors = props.getArray("colors");

        // if we managed to get here and not get colors, give up.
        assert colors != null;

        mColors = new int[colors.size()];
        for (int i=0; i < mColors.length; i++)
        {
            mColors[i] = colors.getInt(i);
        }

        try {
            ReadableArray locations = props.getArray("locations");
            assert locations != null;
            mLocations= new float[locations.size()];
            for (int i=0; i < mLocations.length; i++)
            {
                mLocations[i] = (float) locations.getDouble(i);
            }
        } catch (Exception e) {
            mLocations = null;
        }

        try {
          ReadableArray startPos = props.getArray("start");
          assert startPos != null;
          mStartPos = new float[]{(float) startPos.getDouble(0), (float) startPos.getDouble(1)};
        } catch (Exception e) {
          mStartPos = new float[]{0,0};
        }

        try {
            ReadableArray endPos = props.getArray("end");
            assert endPos != null;
            mEndPos= new float[]{(float) endPos.getDouble(0), (float) endPos.getDouble(1)};
        } catch (Exception e) {
            // default to full height.
            mEndPos = new float[]{0, 1};
        }
        mSize = new int[]{0, 0};
        drawGradient();
    }

    public void updateStartPosition(ReadableArray startPos) {
      float[] _startPos;
      try {
        assert startPos != null;
        _startPos= new float[]{(float) startPos.getDouble(0), (float) startPos.getDouble(1)};
      } catch (Exception e) {
        _startPos = new float[]{0,0};
      }
      mStartPos = _startPos;
      drawGradient();
    }


    public void updateEndPosition(ReadableArray endPos) {
      float[] _endPos;
      try {
        assert endPos != null;
        _endPos= new float[]{(float) endPos.getDouble(0), (float) endPos.getDouble(1)};
      } catch (Exception e) {
        _endPos = new float[]{0,0};
      }
      mEndPos = _endPos;
      drawGradient();
    }


    public void updateColors(ReadableArray colors){
        int[] _colors = new int[colors.size()];
        for (int i=0; i < _colors.length; i++)
        {
            _colors[i] = colors.getInt(i);
        }
        mColors = _colors;
        drawGradient();
    }

    public void updateLocations(ReadableArray locations){
        float[] _locations;
        try {
            assert locations != null;
            _locations = new float[locations.size()];
            for (int i=0; i < _locations.length; i++)
            {
                _locations[i] = (float) locations.getDouble(i);
            }
        } catch (Exception e) {
            _locations = null;
        }
        mLocations = _locations;
        drawGradient();
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        mSize = new int[]{w, h};
        drawGradient();
    }

    private void drawGradient() {
        mShader = new LinearGradient(mStartPos[0] * mSize[0], mStartPos[1] * mSize[1], mEndPos[0] * mSize[0], mEndPos[1] * mSize[1], mColors, mLocations, Shader.TileMode.MIRROR);
        mPaint.setShader(mShader);
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawPaint(mPaint);
    }
}
