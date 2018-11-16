package com.BV.LinearGradient;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.PixelUtil;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.graphics.Shader;
import android.view.View;

public class LinearGradientView extends View {

    private final Paint mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private Path mPathForBorderRadius;
    private RectF mTempRectForBorderRadius;
    private LinearGradient mShader;

    private float[] mLocations;
    private float[] mStartPos = {0, 0};
    private float[] mEndPos = {0, 1};
    private int[] mColors;
    private boolean mUseAngle = false;
    private float[] mAngleCenter = new float[]{0.5f, 0.5f};
    private float mAngle = 45f;
    private int[] mSize = {0, 0};
    private float[] mBorderRadii = {0, 0, 0, 0, 0, 0, 0, 0};


    public LinearGradientView(Context context) {
        super(context);
    }

    public void setStartPosition(ReadableArray startPos) {
        mStartPos = new float[]{(float) startPos.getDouble(0), (float) startPos.getDouble(1)};
        drawGradient();
    }

    public void setEndPosition(ReadableArray endPos) {
        mEndPos = new float[]{(float) endPos.getDouble(0), (float) endPos.getDouble(1)};
        drawGradient();
    }

    public void setColors(ReadableArray colors) {
        int[] _colors = new int[colors.size()];
        for (int i=0; i < _colors.length; i++)
        {
            _colors[i] = colors.getInt(i);
        }
        mColors = _colors;
        drawGradient();
    }

    public void setLocations(ReadableArray locations) {
        float[] _locations = new float[locations.size()];
        for (int i=0; i < _locations.length; i++)
        {
            _locations[i] = (float) locations.getDouble(i);
        }
        mLocations = _locations;
        drawGradient();
    }

    public void setUseAngle(boolean useAngle) {
        mUseAngle = useAngle;
        drawGradient();
    }

    public void setAngleCenter(ReadableArray in) {
        mAngleCenter = new float[]{(float) in.getDouble(0), (float) in.getDouble(1)};
        drawGradient();
    }

    public void setAngle(float angle) {
        mAngle = angle;
        drawGradient();
    }

    public void setBorderRadii(ReadableArray borderRadii) {
        float[] _radii = new float[borderRadii.size()];
        for (int i=0; i < _radii.length; i++)
        {
            _radii[i] = PixelUtil.toPixelFromDIP((float) borderRadii.getDouble(i));
        }
        mBorderRadii = _radii;
        updatePath();
        drawGradient();
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        mSize = new int[]{w, h};
        updatePath();
        drawGradient();
    }

    private float[] calculateGradientLocationWithAngle(float angle) {
        float angleRad = (angle - 90.0f) * ((float)Math.PI / 180.0f);
        float length = (float)Math.sqrt(2.0);

        return new float[]{
                (float) Math.cos(angleRad) * length,
                (float) Math.sin(angleRad) * length
        };
    }

    private void drawGradient() {
        // guard against crashes happening while multiple properties are updated
        if (mColors == null || (mLocations != null && mColors.length != mLocations.length))
            return;

        float[] startPos = mStartPos;
        float[] endPos = mEndPos;

        if (mUseAngle && mAngleCenter != null) {
            float[] angleSize = calculateGradientLocationWithAngle(mAngle);
            startPos = new float[]{
                    mAngleCenter[0] - angleSize[0] / 2.0f,
                    mAngleCenter[1] - angleSize[1] / 2.0f
            };
            endPos = new float[]{
                    mAngleCenter[0] + angleSize[0] / 2.0f,
                    mAngleCenter[1] + angleSize[1] / 2.0f
            };
        }

        mShader = new LinearGradient(
                startPos[0] * mSize[0],
                startPos[1] * mSize[1],
                endPos[0] * mSize[0],
                endPos[1] * mSize[1],
            mColors,
            mLocations,
            Shader.TileMode.CLAMP);
        mPaint.setShader(mShader);
        invalidate();
    }

    private void updatePath() {
        if (mPathForBorderRadius == null) {
            mPathForBorderRadius = new Path();
            mTempRectForBorderRadius = new RectF();
        }
        mPathForBorderRadius.reset();
        mTempRectForBorderRadius.set(0f, 0f, (float) mSize[0], (float) mSize[1]);
        mPathForBorderRadius.addRoundRect(
            mTempRectForBorderRadius,
            mBorderRadii,
            Path.Direction.CW);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if (mPathForBorderRadius == null) {
            canvas.drawPaint(mPaint);
        } else {
            canvas.drawPath(mPathForBorderRadius, mPaint);
        }
    }
}
