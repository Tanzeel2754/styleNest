import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Plus, Edit, Trash2, Tag } from "lucide-react"
import Link from "next/link"

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  // Get all categories with product counts
  const { data: categories } = await supabase
    .from("categories")
    .select(`
      *,
      products (count)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 text-white flex items-center justify-center shadow-lg">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">Categories</h1>
              <p className="text-slate-600 text-xs sm:text-sm">Organize your products into categories</p>
            </div>
          </div>
          <Link href="/admin/categories/new">
            <Button className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 shadow-lg text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add Category
            </Button>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {categories?.map((category) => (
              <Card key={category.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur-sm group">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={category.image_url || "/placeholder.svg?height=200&width=300"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{category.name}</h3>
                      <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200 text-xs">
                        {category.products?.[0]?.count || 0} products
                      </Badge>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-2">{category.description}</p>

                    <div className="flex gap-1 sm:gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent hover:bg-blue-50 hover:border-blue-300 text-xs">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 bg-transparent text-xs">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {(!categories || categories.length === 0) && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                <Tag className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No categories yet</h3>
              <p className="text-slate-600 mb-4 text-sm">Create categories to organize your products and improve customer navigation.</p>
              <Link href="/admin/categories/new">
                <Button className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 shadow-lg text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
