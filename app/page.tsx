import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CartButton } from "@/components/cart-button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Sparkles, Shield, Truck } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get featured products
  const { data: featuredProducts } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(6)

  // Get categories
  const { data: categories } = await supabase.from("categories").select("*").limit(4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50 border-b border-slate-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">
                StyleNest
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-slate-700 hover:text-violet-600 transition-colors font-medium">
                All Products
              </Link>
              {categories?.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="text-slate-700 hover:text-violet-600 transition-colors font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/account">
                    <Button variant="ghost" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      My Account
                    </Button>
                  </Link>
                  <CartButton />
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
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

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 via-transparent to-slate-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Fashion Collection
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-violet-800 to-slate-900 bg-clip-text text-transparent mb-6 text-balance leading-tight">
              Discover Your Perfect Style
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
              Curated collections of premium clothing that blend contemporary design with unmatched comfort and quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/products">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 text-white hover:text-white border-0"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/products?featured=true">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300 bg-white/80 backdrop-blur-sm hover:text-violet-700"
                >
                  Featured Items
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-violet-600" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-violet-600" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-violet-600 fill-violet-600" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">Shop by Category</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              Discover our carefully curated collections designed for every style and occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories?.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`}>
                <Card className="group hover-lift border-0 shadow-md hover:shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={
                          category.image_url || "/placeholder.svg?height=400&width=400&query=modern fashion category"
                        }
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-violet-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">Featured Collection</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              Handpicked favorites that define quality, style, and exceptional craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts?.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card className="group hover-lift border-0 shadow-lg hover:shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.image_url || "/placeholder.svg?height=600&width=600&query=premium fashion product"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.compare_at_price && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                          Sale
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-slate-500 ml-2 font-medium">(4.8)</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-slate-900">PKR {product.price}</span>
                          {product.compare_at_price && (
                            <span className="text-sm text-slate-500 line-through">PKR {product.compare_at_price}</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-violet-100 text-violet-700 hover:bg-violet-200 border-0"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300 shadow-md bg-transparent"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">StyleNest</span>
              </div>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Premium fashion that combines contemporary style, exceptional comfort, and sustainable craftsmanship.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Shop</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/products" className="hover:text-violet-400 transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-violet-400 transition-colors">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            {/* Support */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/contact" className="hover:text-violet-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-violet-400 transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-violet-400 transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="hover:text-violet-400 transition-colors">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
            {/* Account */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Account</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/auth/login" className="hover:text-violet-400 transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/auth/sign-up" className="hover:text-violet-400 transition-colors">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-violet-400 transition-colors">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/account/orders" className="hover:text-violet-400 transition-colors">
                    Order History
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 StyleNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
