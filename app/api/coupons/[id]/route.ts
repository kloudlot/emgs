import { NextRequest, NextResponse } from "next/server";
import {
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from "@/lib/supabase/coupon.service";

/**
 * GET /api/coupons/[id]
 * Get a single coupon by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const coupon = await getCouponById(id);

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: coupon,
    });
  } catch (error: any) {
    console.error("Error in GET /api/coupons/[id]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch coupon",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/coupons/[id]
 * Update a coupon
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate discount type if provided
    if (body.discount_type && !["percentage", "fixed"].includes(body.discount_type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid discount_type. Must be 'percentage' or 'fixed'",
        },
        { status: 400 }
      );
    }

    // Validate discount value if provided
    if (body.discount_value !== undefined) {
      if (body.discount_value <= 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Discount value must be greater than 0",
          },
          { status: 400 }
        );
      }

      if (body.discount_type === "percentage" && body.discount_value > 100) {
        return NextResponse.json(
          {
            success: false,
            error: "Percentage discount cannot exceed 100",
          },
          { status: 400 }
        );
      }
    }

    // Validate expire date if provided
    if (body.expire_date) {
      const expireDate = new Date(body.expire_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (expireDate < today) {
        return NextResponse.json(
          {
            success: false,
            error: "Expire date must be in the future",
          },
          { status: 400 }
        );
      }
    }

    // Validate maximum use count if provided
    if (body.maximum_use_count !== undefined && body.maximum_use_count <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Maximum use count must be greater than 0",
        },
        { status: 400 }
      );
    }

    const updatedCoupon = await updateCoupon(id, body);

    return NextResponse.json({
      success: true,
      data: updatedCoupon,
    });
  } catch (error: any) {
    console.error("Error in PATCH /api/coupons/[id]:", error);
    
    // Handle duplicate code error
    if (error.message.includes("duplicate key") || error.message.includes("unique constraint")) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon code already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update coupon",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/coupons/[id]
 * Delete a coupon
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if coupon exists
    const coupon = await getCouponById(id);
    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon not found",
        },
        { status: 404 }
      );
    }

    await deleteCoupon(id);

    return NextResponse.json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error: any) {
    console.error("Error in DELETE /api/coupons/[id]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete coupon",
      },
      { status: 500 }
    );
  }
}
