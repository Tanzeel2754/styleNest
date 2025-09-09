import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Plus, Edit, Eye, Trash2, Package, Sparkles } from "lucide-react"

export default async function AdminProductsPage() {
  const supabase = await createClient()

  // Get all products with categories
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 text-white flex items-center justify-center shadow-lg">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">Products</h1>
              <p className="text-slate-600 text-xs sm:text-sm">Manage your product catalog</p>
            </div>
          </div>
          <Link href="/admin/products/new">
            <Button className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 shadow-lg text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {products?.map((product) => (
              <Card key={product.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image_url || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 right-1 flex gap-1">
                      {product.is_featured && <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg text-xs">Featured</Badge>}
                      <Badge variant={product.is_active ? "default" : "secondary"} className="shadow-lg text-xs">
                        {product.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900 line-clamp-1 text-sm sm:text-base">{product.name}</h3>
                      <Badge variant="outline" className="text-xs ml-2 bg-violet-50 text-violet-700 border-violet-200">
                        {product.categories?.name}
                      </Badge>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3">{product.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-bold text-slate-900 text-sm sm:text-base">PKR {product.price}</span>
                        {product.compare_at_price && (
                          <span className="text-xs sm:text-sm text-slate-500 line-through ml-2">PKR {product.compare_at_price}</span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600">Stock: {product.stock_quantity}</div>
                    </div>

                    <div className="flex gap-1 sm:gap-2">
                      <Link href={`/products/${product.slug}`} target="_blank" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent hover:bg-violet-50 hover:border-violet-300 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent hover:bg-blue-50 hover:border-blue-300 text-xs">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </Link>
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

        {(!products || products.length === 0) && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No products yet</h3>
              <p className="text-slate-600 mb-4 text-sm">Get started by adding your first product to build your catalog.</p>
              <Link href="/admin/products/new">
                <Button className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 shadow-lg text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
