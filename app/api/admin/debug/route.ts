import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check admin_credentials table
    const { data: adminCreds, error: credsError } = await supabase.from("admin_credentials").select("*")

    // Check profiles table for admin users
    const { data: adminProfiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .eq("is_admin", true)

    // Check all profiles
    const { data: allProfiles, error: allProfilesError } = await supabase.from("profiles").select("*")

    return NextResponse.json({
      admin_credentials: {
        data: adminCreds,
        error: credsError,
        count: adminCreds?.length || 0,
      },
      admin_profiles: {
        data: adminProfiles,
        error: profilesError,
        count: adminProfiles?.length || 0,
      },
      all_profiles: {
        data: allProfiles,
        error: allProfilesError,
        count: allProfiles?.length || 0,
      },
    })
  } catch (error) {
    console.log("[v0] Debug endpoint error:", error)
    return NextResponse.json({ error: "Debug failed" }, { status: 500 })
  }
}
