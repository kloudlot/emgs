import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getCurrentUserProfile,
  updateUserProfile,
} from "@/lib/supabase/user.service";

/**
 * GET /api/user/profile
 * Fetch current user's profile
 */
export async function GET() {
  try {
    const { data: profile, error } = await getCurrentUserProfile();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message || "Failed to fetch profile" },
        { status: 500 }
      );
    }

    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user/profile
 * Update current user's profile
 */
export async function PATCH(request: NextRequest) {
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

    const body = await request.json();
    const { full_name, phone_number, avatar_url } = body;

    // Validate input
    if (!full_name && !phone_number && !avatar_url) {
      return NextResponse.json(
        { success: false, error: "No fields to update" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (full_name !== undefined) updateData.full_name = full_name;
    if (phone_number !== undefined) updateData.phone_number = phone_number;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url;

    const { data: profile, error } = await updateUserProfile(
      user.id,
      updateData
    );

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message || "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
