import { type NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("[v0] Admin login attempt:", { email, password })

    const supabase = await createClient()

    const { data: allCreds } = await supabase.from("admin_credentials").select("*")

    console.log("[v0] All admin credentials in database:", allCreds)

    const { data: adminCreds, error } = await supabase
      .from("admin_credentials")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single()

    console.log("[v0] Admin credentials query result:", { adminCreds, error })

    if (error || !adminCreds) {
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 })
    }

    // Verify admin profile exists using service role to bypass RLS safely
    const service = await createServiceClient()
    const { data: profile } = await service
      .from("profiles")
      .select("*")
      .eq("email", email)
      .eq("is_admin", true)
      .single()

    console.log("[v0] Admin profile query result:", { profile })

    if (!profile) {
      return NextResponse.json({ error: "Admin profile not found" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      admin: {
        email: profile.email,
        name: profile.full_name,
      },
    })
  } catch (error) {
    console.log("[v0] Admin login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
