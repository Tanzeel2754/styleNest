"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"

type Category = { id: string; name: string }

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [compareAtPrice, setCompareAtPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [galleryUrls, setGalleryUrls] = useState("")
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null)
  const [sizes, setSizes] = useState("")
  const [colors, setColors] = useState("")
  const [stockQuantity, setStockQuantity] = useState("")
  const [isFeatured, setIsFeatured] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("categories").select("id, name").order("name", { ascending: true })
      setCategories((data as Category[]) || [])
    }
    load()
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // Upload main image if provided (server-side)
      let finalImageUrl = imageUrl
      if (imageFile) {
        const form = new FormData()
        form.append("bucket", "products")
        form.append("prefix", "")
        form.append("file", imageFile)
        const up = await fetch("/api/admin/storage/upload", { method: "POST", body: form })
        const upData = await up.json()
        if (!up.ok) throw new Error(upData.error || "Upload failed")
        finalImageUrl = upData.url
      }

      // Upload gallery images if provided
      let finalGalleryUrls: string[] | null = galleryUrls ? galleryUrls.split(",").map((s) => s.trim()) : null
      if (galleryFiles && galleryFiles.length > 0) {
        const uploaded: string[] = []
        for (const file of Array.from(galleryFiles)) {
          const form = new FormData()
          form.append("bucket", "products")
          form.append("prefix", "")
          form.append("file", file)
          const up = await fetch("/api/admin/storage/upload", { method: "POST", body: form })
          const upData = await up.json()
          if (!up.ok) throw new Error(upData.error || "Upload failed")
          uploaded.push(upData.url)
        }
        finalGalleryUrls = (finalGalleryUrls || []).concat(uploaded)
      }

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          description,
          price: parseFloat(price),
          compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : null,
          category_id: categoryId,
          image_url: finalImageUrl,
          gallery_urls: finalGalleryUrls,
          sizes: sizes ? sizes.split(",").map((s) => s.trim()) : null,
          colors: colors ? colors.split(",").map((s) => s.trim()) : null,
          stock_quantity: stockQuantity ? parseInt(stockQuantity) : 0,
          is_featured: isFeatured,
          is_active: isActive,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create product")
      router.push("/admin/products")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (PKR)</Label>
              <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compare">Compare at price (PKR)</Label>
              <Input id="compare" type="number" step="0.01" value={compareAtPrice} onChange={(e) => setCompareAtPrice(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" className="border rounded h-10 px-3" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageFile">Or upload main image</Label>
              <Input id="imageFile" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="gallery">Gallery URLs (comma separated)</Label>
              <Input id="gallery" value={galleryUrls} onChange={(e) => setGalleryUrls(e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="galleryFiles">Or upload gallery images</Label>
              <Input id="galleryFiles" type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(e.target.files)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sizes">Sizes (comma separated)</Label>
              <Input id="sizes" value={sizes} onChange={(e) => setSizes(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="colors">Colors (comma separated)</Label>
              <Input id="colors" value={colors} onChange={(e) => setColors(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock quantity</Label>
              <Input id="stock" type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured">Featured</Label>
              <input id="featured" type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="active">Active</Label>
              <input id="active" type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            </div>
            <div className="md:col-span-2 flex gap-2 mt-2">
              <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


