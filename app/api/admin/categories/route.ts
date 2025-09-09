import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      slug,
      description,
      image_url,
    }: { name: string; slug: string; description?: string; image_url?: string } = body

    if (!name || !slug) {
      return NextResponse.json({ error: "Missing required fields: name, slug" }, { status: 400 })
    }

    const supabase = await createServiceClient()

    const { data, error } = await supabase
      .from("categories")
      .insert({ name, slug, description: description ?? null, image_url: image_url ?? null })
      .select("*")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, category: data })
  } catch (error) {
    return NextResponse.json({ error: "Create category failed" }, { status: 500 })
  }
}


