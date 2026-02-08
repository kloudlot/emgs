import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateReferralCode } from "@/lib/supabase/user.service";

/**
 * GET /api/user/referral
 * Get current user's referral code
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: profile, error } = await supabase
      .from("user_profiles")
      .select("referral_code")
      .eq("id", user.id)
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to fetch referral code",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { referral_code: profile.referral_code },
    });
  } catch (error: any) {
    console.error("Error fetching referral code:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/referral
 * Generate a new referral code for current user
 */
export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: code, error } = await generateReferralCode(user.id);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to generate referral code",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { referral_code: code },
    });
  } catch (error: any) {
    console.error("Error generating referral code:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
