import { NextResponse } from "next/server"

export async function POST() {
  // Simple logout endpoint for admin
  return NextResponse.json({ success: true })
}
