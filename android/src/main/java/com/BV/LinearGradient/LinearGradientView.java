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

    public static Paint mPaint;
    public static LinearGradient mShader;
    public static float[] mLocations;
    public static int[] mStartPos;
    public static int[] mEndPos;
    public static int[] mColors;

    public LinearGradientView(Context context, CatalystStylesDiffMap props) {
        super(context, null);

        mPaint = new Paint();

        ReadableArray colors = props.getArray("colors");

        //If we managed to get here and not get colors... give up.
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
          mStartPos = new int[]{startPos.getInt(0), startPos.getInt(1)};
        } catch (Exception e) {
          mStartPos = new int[]{0,0};
        }


        try {
            ReadableArray endPos = props.getArray("end");
            assert endPos != null;
            mEndPos= new int[]{endPos.getInt(0), endPos.getInt(1)};
        } catch (Exception e) {
          //default to full height.
            mEndPos = new int[]{0, getMeasuredHeight()};
        }

        drawGradient(null, null, null, null);
    }

    public void updateStartPosition(ReadableArray startPos) {
      int[] _startPos;
      try {
        assert startPos != null;
        _startPos= new int[]{startPos.getInt(0), startPos.getInt(1)};
      } catch (Exception e) {
        _startPos = new int[]{0,0};
      }
      drawGradient(_startPos, null, null, null);
    }


    public void updateEndPosition(ReadableArray endPos) {
      int[] _endPos;
      try {
        assert endPos != null;
        _endPos= new int[]{endPos.getInt(0), endPos.getInt(1)};
      } catch (Exception e) {
        _endPos = new int[]{0,0};
      }
      drawGradient(null,_endPos, null, null);
    }


    public void updateColors(ReadableArray colors){
        int[] _colors = new int[colors.size()];
        for (int i=0; i < _colors.length; i++)
        {
            _colors[i] = colors.getInt(i);
        }
        drawGradient(null, null, _colors, null);
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
        drawGradient(null, null, null, _locations);
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        //TODO: Ensure that we don't override a specified startPos / endPos
        int[] _endPos = new int[]{mEndPos[0], h};
        drawGradient(null, _endPos, null, null);
    }

    private void drawGradient(int[] startPos, int[] endPos, int[] colors, float[] locations) {
        mStartPos = startPos != null ? startPos : mStartPos;
        mEndPos = endPos != null ? endPos : mEndPos;
        mColors = colors != null ? colors : mColors;
        mLocations = locations;
        //locations can be null, thats just fine, so pass it as such.
        mShader = new LinearGradient(mStartPos[0], mStartPos[1], mEndPos[0], mEndPos[1], mColors, locations, Shader.TileMode.MIRROR);
        mPaint.setShader(mShader);
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawPaint(mPaint);
    }
}
