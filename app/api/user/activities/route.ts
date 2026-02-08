import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserActivities } from "@/lib/supabase/user.service";

/**
 * GET /api/user/activities
 * Fetch current user's activity feed
 */
export async function GET(request: NextRequest) {
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

    // Get pagination parameters from query string
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    const { data: activities, error } = await getUserActivities(
      user.id,
      limit,
      offset
    );

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to fetch activities",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: activities || [] });
  } catch (error: any) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
