package com.BV.LinearGradient;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.PixelUtil;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.RectF;
import android.graphics.Shader;
import android.view.View;

import java.util.Arrays;

public class LinearGradientView extends View {
    private final Paint mGradientPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);

    private float[] mLocations;
    private float[] mStartPos = {0, 0};
    private float[] mEndPos = {0, 1};
    private int[] mColors;

    private float[] mLastLocations;
    private float[] mLastStartPos = mStartPos;
    private float[] mLastEndPos = mEndPos;
    private int[] mLastColors;

    private float[] mBorderRadii = {0, 0, 0, 0, 0, 0, 0, 0};

    private Path mPath = new Path();
    private RectF mOvalRectF = new RectF();

    public LinearGradientView(Context context) {
        super(context);

        mPaint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.DST_OUT));
    }

    public void setStartPosition(ReadableArray startPos) {
        mStartPos = new float[]{(float) startPos.getDouble(0), (float) startPos.getDouble(1)};
        invalidate();
    }

    public void setEndPosition(ReadableArray endPos) {
        mEndPos = new float[]{(float) endPos.getDouble(0), (float) endPos.getDouble(1)};
        invalidate();
    }

    public void setColors(ReadableArray colors) {
        int[] _colors = new int[colors.size()];
        for (int i=0; i < _colors.length; i++)
        {
            _colors[i] = colors.getInt(i);
        }
        mColors = _colors;
        invalidate();
    }

    public void setLocations(ReadableArray locations) {
        float[] _locations = new float[locations.size()];
        for (int i=0; i < _locations.length; i++)
        {
            _locations[i] = (float) locations.getDouble(i);
        }
        mLocations = _locations;
        invalidate();
    }

    public void setBorderRadii(ReadableArray borderRadii) {
        float[] _radii = new float[borderRadii.size()];
        for (int i = 0; i < _radii.length; i++) {
            _radii[i] = PixelUtil.toPixelFromDIP((float) borderRadii.getDouble(i));
        }
        mBorderRadii = _radii;
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        canvas.saveLayer(0, 0, getWidth(), getHeight(), null, Canvas.ALL_SAVE_FLAG);

        drawGradient(canvas);

        clipTopLeft(canvas);
        clipTopRight(canvas);
        clipBottomRight(canvas);
        clipBottomLeft(canvas);

        canvas.restore();
    }

    private void drawGradient(Canvas canvas) {
        // guard against crashes happening while multiple properties are updated
        if (mColors == null || (mLocations != null && mColors.length != mLocations.length)) {
            return;
        }
        if (!Arrays.equals(mColors, mLastColors)
            || !Arrays.equals(mStartPos, mLastStartPos)
            || !Arrays.equals(mEndPos, mLastEndPos)
            || !Arrays.equals(mLocations, mLastLocations)) {
            mLastColors = mColors;
            mLastStartPos = mStartPos;
            mLastEndPos = mEndPos;
            mLastLocations = mLocations;
            LinearGradient shader = new LinearGradient(
                    mStartPos[0] * getWidth(),
                    mStartPos[1] * getHeight(),
                    mEndPos[0] * getWidth(),
                    mEndPos[1] * getHeight(),
                    mColors,
                    mLocations,
                    Shader.TileMode.CLAMP);
            mGradientPaint.setShader(shader);
        }

        canvas.drawPaint(mGradientPaint);
    }

    private void clipTopLeft(Canvas canvas) {
        if (mBorderRadii[0] > 0 && mBorderRadii[1] > 0) {
            mPath.reset();
            mPath.moveTo(0, mBorderRadii[1]);
            mPath.lineTo(0, 0);
            mPath.lineTo(mBorderRadii[0], 0);
            mOvalRectF.set(0, 0, mBorderRadii[0] * 2, mBorderRadii[1] * 2);
            mPath.arcTo(mOvalRectF, -90, -90);
            mPath.close();
            canvas.drawPath(mPath, mPaint);
        }
    }

    private void clipTopRight(Canvas canvas) {
        if (mBorderRadii[2] > 0 && mBorderRadii[3] > 0) {
            int width = getWidth();
            mPath.reset();
            mPath.moveTo(width - mBorderRadii[2], 0);
            mPath.lineTo(width, 0);
            mPath.lineTo(width, mBorderRadii[3]);
            mOvalRectF.set(width - mBorderRadii[2] * 2, 0, width, mBorderRadii[3] * 2);
            mPath.arcTo(mOvalRectF, 0, -90);
            mPath.close();
            canvas.drawPath(mPath, mPaint);
        }
    }

    private void clipBottomRight(Canvas canvas) {
        if (mBorderRadii[4] > 0 && mBorderRadii[5] > 0) {
            int height = getHeight();
            int width = getWidth();
            mPath.reset();
            mPath.moveTo(width - mBorderRadii[4], height);
            mPath.lineTo(width, height);
            mPath.lineTo(width, height - mBorderRadii[5]);
            mOvalRectF.set(width - mBorderRadii[4] * 2, height - mBorderRadii[5] * 2, width, height);
            mPath.arcTo(mOvalRectF, 0, 90);
            mPath.close();
            canvas.drawPath(mPath, mPaint);
        }
    }

    private void clipBottomLeft(Canvas canvas) {
        if (mBorderRadii[6] > 0 && mBorderRadii[7] > 0) {
            int height = getHeight();
            mPath.reset();
            mPath.moveTo(0, height - mBorderRadii[7]);
            mPath.lineTo(0, height);
            mPath.lineTo(mBorderRadii[6], height);
            mOvalRectF.set(0, height - mBorderRadii[7] * 2, mBorderRadii[6] * 2, height);
            mPath.arcTo(mOvalRectF, 90, 90);
            mPath.close();
            canvas.drawPath(mPath, mPaint);
        }
    }
}
