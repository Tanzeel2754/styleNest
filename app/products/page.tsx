import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CartButton } from "@/components/cart-button"
import Link from "next/link"
import Image from "next/image"
import { Star, Grid, List, Sparkles } from "lucide-react"

interface SearchParams {
  category?: string
  featured?: string
  sort?: string
  search?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Build query based on search params
  let query = supabase
    .from("products")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("is_active", true)

  // Apply filters
  if (params.category) {
    const { data: category } = await supabase.from("categories").select("id").eq("slug", params.category).single()

    if (category) {
      query = query.eq("category_id", category.id)
    }
  }

  if (params.featured === "true") {
    query = query.eq("is_featured", true)
  }

  if (params.search) {
    query = query.ilike("name", `%${params.search}%`)
  }

  // Apply sorting
  switch (params.sort) {
    case "price-low":
      query = query.order("price", { ascending: true })
      break
    case "price-high":
      query = query.order("price", { ascending: false })
      break
    case "name":
      query = query.order("name", { ascending: true })
      break
    default:
      query = query.order("created_at", { ascending: false })
  }

  const { data: products } = await query

  // Get all categories for filter
  const { data: categories } = await supabase.from("categories").select("*")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-violet-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                StyleNest
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-gray-900 transition-colors">
                All Products
              </Link>
              {categories?.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className={`transition-colors ${
                    params.category === category.slug
                      ? "text-gray-900 font-medium"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/account">
                    <Button variant="ghost" size="sm">
                      My Account
                    </Button>
                  </Link>
                  <CartButton />
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <CartButton />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {params.category
              ? categories?.find((c) => c.slug === params.category)?.name || "Products"
              : params.featured === "true"
                ? "Featured Products"
                : "All Products"}
          </h1>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Link href="/products">
                <Badge variant={!params.category && params.featured !== "true" ? "default" : "outline"}>
                  All Products
                </Badge>
              </Link>
              <Link href="/products?featured=true">
                <Badge variant={params.featured === "true" ? "default" : "outline"}>Featured</Badge>
              </Link>
              {categories?.map((category) => (
                <Link key={category.id} href={`/products?category=${category.slug}`}>
                  <Badge variant={params.category === category.slug ? "default" : "outline"}>{category.name}</Badge>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                defaultValue={params.sort || "newest"}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>

              <div className="flex border border-gray-300 rounded-md">
                <Button variant="ghost" size="sm" className="border-r">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.image_url || "/placeholder.svg?height=400&width=400"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.compare_at_price && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                          Sale
                        </div>
                      )}
                      {product.is_featured && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">PKR {product.price}</span>
                          {product.compare_at_price && (
                            <span className="text-xs text-gray-500 line-through">PKR {product.compare_at_price}</span>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {product.categories?.name}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms.</p>
            <Link href="/products">
              <Button>View All Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
