package com.BV.LinearGradient;

import com.facebook.react.bridge.ColorPropConverter;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableType;
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
    private float[] mStartPoint = {0, 0};
    private float[] mEndPoint = {0, 1};
    private int[] mColors;
    private boolean mUseAngle = false;
    private float[] mAngleCenter = new float[]{0.5f, 0.5f};
    private float mAngle = 45f;
    private int[] mSize = {0, 0};
    private float[] mBorderRadii = {0, 0, 0, 0, 0, 0, 0, 0};


    public LinearGradientView(Context context) {
        super(context);
    }

    /**
     * Gets the point of the element that a line perpendicular to the gradient line
     * intersects first. This will always be a corner.
     *
     * @param angle the gradient line angle, in cartesian degrees
     * @param size  the size of the element
     * @return the corner X and Y coordinates relative to the element center in cartesian
     */
    static private float[] getStartCornerToIntersect(float angle, int[] size) {
        float halfWidth = size[0] / 2f;
        float halfHeight = size[1] / 2f;
        if (angle < 90f) {
            // Bottom left
            return new float[]{-halfWidth, -halfHeight};
        } else if (angle < 180f) {
            // Bottom right
            return new float[]{halfWidth, -halfHeight};
        } else if (angle < 270f) {
            // Top right
            return new float[]{halfWidth, halfHeight};
        } else {
            // Top left
            return new float[]{-halfWidth, halfHeight};
        }
    }

    /**
     * Gets the start point assuming the angle is a multiple of 90 degrees
     *
     * @param angle the gradient line angle, in cartesian degrees
     * @param size  the size of the element
     * @return the start point, relative to the angle center in cartesian
     */
    static private float[] getHorizontalOrVerticalStartPoint(float angle, int[] size) {
        float halfWidth = size[0] / 2f;
        float halfHeight = size[1] / 2f;
        if (angle == 0f) {
            // Horizontal, left-to-right
            return new float[]{-halfWidth, 0};
        } else if (angle == 90f) {
            // Vertical, bottom-to-top
            return new float[]{0, -halfHeight};
        } else if (angle == 180f) {
            // Horizontal, right-to-left
            return new float[]{halfWidth, 0};
        } else {
            // Vertical, top to bottom
            return new float[]{0, halfHeight};
        }
    }

    /**
     * Gets the gradient start point for an angle
     *
     * @param angle the gradient line angle, in cartesian degrees
     * @param size  the size of the element
     * @return the start point X and Y coordinate, relative to the angle center in cartesian
     */
    static private float[] getGradientStartPoint(float angle, int[] size) {
        // Bound angle to [0, 360)
        angle = angle % 360f;
        if (angle < 0f)
            angle += 360f;

        // Explicitly check for horizontal or vertical gradients, as slopes of
        // the gradient line or a line perpendicular will be undefined in that case
        if (angle % 90 == 0) {
            return getHorizontalOrVerticalStartPoint(angle, size);
        }

        // Get the equivalent slope of the gradient line as tan = opposite/adjacent = y/x
        float slope = (float) Math.tan(angle * Math.PI / 180.0f);

        // Find the start point by computing the intersection of the gradient line
        // and a line perpendicular to it that intersects the nearest corner
        float perpendicularSlope = -1 / slope;

        // Get the start corner to intersect relative to center, in cartesian space (+y = up)
        float[] startCorner = getStartCornerToIntersect(angle, size);

        // Compute b (of y = mx + b) to get the equation for the perpendicular line
        float b = startCorner[1] - perpendicularSlope * startCorner[0];

        // Solve the intersection of the gradient line and the perpendicular line:
        float startX = b / (slope - perpendicularSlope);
        float startY = slope * startX;

        return new float[]{startX, startY};
    }

    public void setStartPoint(ReadableArray startPoint) {
        mStartPoint = new float[]{(float) startPoint.getDouble(0), (float) startPoint.getDouble(1)};
        drawGradient();
    }

    public void setEndPoint(ReadableArray endPoint) {
        mEndPoint = new float[]{(float) endPoint.getDouble(0), (float) endPoint.getDouble(1)};
        drawGradient();
    }

    public void setColors(ReadableArray colors) {
        int[] _colors = new int[colors.size()];
        for (int i = 0; i < _colors.length; i++) {
            _colors[i] =
                    colors.getType(i) == ReadableType.Map
                            ? ColorPropConverter.getColor(colors.getMap(i), getContext())
                            : colors.getInt(i);
        }
        mColors = _colors;
        drawGradient();
    }

    public void setLocations(ReadableArray locations) {
        float[] _locations = new float[locations.size()];
        for (int i = 0; i < _locations.length; i++) {
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
        for (int i = 0; i < _radii.length; i++) {
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

    private void drawGradient() {
        // guard against crashes happening while multiple properties are updated
        if (mColors == null || (mLocations != null && mColors.length != mLocations.length))
            return;

        float[] startPoint;
        float[] endPoint;

        if (mUseAngle && mAngleCenter != null) {
            // Angle is in bearing degrees (North = 0, East = 90)
            // convert it to cartesian (N = 90, E = 0)
            float angle = (90 - mAngle);
            float[] relativeStartPoint = getGradientStartPoint(angle, mSize);

            // Get true angleCenter
            float[] angleCenter = new float[]{
                    mAngleCenter[0] * mSize[0],
                    mAngleCenter[1] * mSize[1]
            };
            // Translate to center on angle center
            // Flip Y coordinate to convert from cartesian
            startPoint = new float[]{
                    angleCenter[0] + relativeStartPoint[0],
                    angleCenter[1] - relativeStartPoint[1]
            };
            // Reflect across the center to get the end point
            endPoint = new float[]{
                    angleCenter[0] - relativeStartPoint[0],
                    angleCenter[1] + relativeStartPoint[1]
            };
        } else {
            startPoint = new float[]{mStartPoint[0] * mSize[0], mStartPoint[1] * mSize[1]};
            endPoint = new float[]{mEndPoint[0] * mSize[0], mEndPoint[1] * mSize[1]};
        }

        mShader = new LinearGradient(
                startPoint[0],
                startPoint[1],
                endPoint[0],
                endPoint[1],
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
