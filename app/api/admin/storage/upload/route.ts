import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServiceClient()

    const contentType = request.headers.get("content-type") || ""
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 })
    }

    const form = await request.formData()
    const file = form.get("file") as File | null
    const bucket = (form.get("bucket") as string | null) || undefined
    const prefix = (form.get("prefix") as string | null) || ""

    if (!file) return NextResponse.json({ error: "Missing file" }, { status: 400 })
    if (!bucket) return NextResponse.json({ error: "Missing bucket" }, { status: 400 })

    const objectKey = `${prefix ? prefix.replace(/\/$/, "") + "/" : ""}${crypto.randomUUID()}-${file.name}`

    const arrayBuf = await file.arrayBuffer()
    const bytes = new Uint8Array(arrayBuf)

    const { error: uploadError } = await supabase.storage.from(bucket).upload(objectKey, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    })
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 })

    const { data: pub } = supabase.storage.from(bucket).getPublicUrl(objectKey)

    return NextResponse.json({ success: true, key: objectKey, url: pub.publicUrl })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


