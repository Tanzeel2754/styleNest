import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServiceClient()

    const ensureBucket = async (name: string) => {
      const { data: list } = await supabase.storage.listBuckets()
      const exists = list?.some((b) => b.name === name)
      if (!exists) {
        const { error } = await supabase.storage.createBucket(name, {
          public: true,
          fileSizeLimit: "20MB",
        })
        if (error) throw error
      }
    }

    await ensureBucket("categories")
    await ensureBucket("products")

    return NextResponse.json({ success: true, buckets: ["categories", "products"] })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Init failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


