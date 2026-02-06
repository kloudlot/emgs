import { NextRequest, NextResponse } from "next/server";
import { getCoupons, createCoupon } from "@/lib/supabase/coupon.service";
import { CreateCouponInput } from "@/lib/types/coupon";

/**
 * GET /api/coupons
 * List all coupons
 */
export async function GET() {
  try {
    const coupons = await getCoupons();
    return NextResponse.json({
      success: true,
      data: coupons,
    });
  } catch (error: any) {
    console.error("Error in GET /api/coupons:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch coupons",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/coupons
 * Create a new coupon
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.code || !body.discount_type || !body.discount_value || !body.expire_date || !body.maximum_use_count) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: code, discount_type, discount_value, expire_date, maximum_use_count",
        },
        { status: 400 }
      );
    }

    // Validate discount type
    if (!["percentage", "fixed"].includes(body.discount_type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid discount_type. Must be 'percentage' or 'fixed'",
        },
        { status: 400 }
      );
    }

    // Validate discount value
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

    // Validate expire date
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

    // Validate maximum use count
    if (body.maximum_use_count <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Maximum use count must be greater than 0",
        },
        { status: 400 }
      );
    }

    const couponInput: CreateCouponInput = {
      code: body.code,
      discount_type: body.discount_type,
      discount_value: parseFloat(body.discount_value),
      expire_date: body.expire_date,
      maximum_use_count: parseInt(body.maximum_use_count),
      is_active: body.is_active ?? true,
    };

    const coupon = await createCoupon(couponInput);

    return NextResponse.json({
      success: true,
      data: coupon,
    });
  } catch (error: any) {
    console.error("Error in POST /api/coupons:", error);
    
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
        error: error.message || "Failed to create coupon",
      },
      { status: 500 }
    );
  }
}
