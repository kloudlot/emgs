import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserStats } from "@/lib/supabase/user.service";

/**
 * GET /api/user/stats
 * Fetch current user's dashboard statistics
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

    const { data: stats, error } = await getUserStats(user.id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message || "Failed to fetch stats" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
