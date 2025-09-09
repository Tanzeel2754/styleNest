import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      slug,
      description,
      price,
      compare_at_price,
      category_id,
      image_url,
      gallery_urls,
      sizes,
      colors,
      stock_quantity,
      is_featured,
      is_active,
    } = body

    if (!name || !slug || !price || !category_id) {
      return NextResponse.json({ error: "Missing required fields: name, slug, price, category_id" }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Ensure unique slug by appending incrementing suffix when necessary
    const toSlug = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
    const baseSlug = toSlug(slug)
    let finalSlug = baseSlug
    for (let i = 1; i <= 50; i++) {
      const { data: existing } = await supabase.from("products").select("id").eq("slug", finalSlug).limit(1)
      if (!existing || existing.length === 0) break
      finalSlug = `${baseSlug}-${i + 1}`
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        slug: finalSlug,
        description: description ?? null,
        price,
        compare_at_price: compare_at_price ?? null,
        category_id,
        image_url: image_url ?? null,
        gallery_urls: gallery_urls ?? null,
        sizes: sizes ?? null,
        colors: colors ?? null,
        stock_quantity: stock_quantity ?? 0,
        is_featured: is_featured ?? false,
        is_active: is_active ?? true,
      })
      .select("*")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, product: data })
  } catch (error) {
    return NextResponse.json({ error: "Create product failed" }, { status: 500 })
  }
}


