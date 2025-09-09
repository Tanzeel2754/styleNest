import { createServiceClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, DollarSign, TrendingUp, Clock, AlertTriangle, Users, Sparkles } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createServiceClient()

  // Get dashboard statistics
  const [{ count: totalProducts }, { count: totalOrders }, { data: recentOrders }, { data: lowStockProducts }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("products").select("*").lt("stock_quantity", 10).eq("is_active", true).limit(5),
    ])

  // Calculate total revenue
  const { data: orders } = await supabase.from("orders").select("total_amount").neq("status", "cancelled")

  const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-slate-600 text-xs sm:text-sm">Welcome to your StyleNest admin panel</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 flex-shrink-0">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 sm:p-4">
              <CardTitle className="text-xs font-medium text-green-700">Revenue</CardTitle>
              <div className="p-1 rounded-lg bg-green-100">
                <DollarSign className="h-3 w-3 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <div className="text-sm sm:text-lg font-bold text-green-800">PKR {totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-2 w-2 inline mr-1" />
                +12%
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 sm:p-4">
              <CardTitle className="text-xs font-medium text-blue-700">Orders</CardTitle>
              <div className="p-1 rounded-lg bg-blue-100">
                <ShoppingCart className="h-3 w-3 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <div className="text-sm sm:text-lg font-bold text-blue-800">{totalOrders || 0}</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-2 w-2 inline mr-1" />
                +8%
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 sm:p-4">
              <CardTitle className="text-xs font-medium text-violet-700">Products</CardTitle>
              <div className="p-1 rounded-lg bg-violet-100">
                <Package className="h-3 w-3 text-violet-600" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <div className="text-sm sm:text-lg font-bold text-violet-800">{totalProducts || 0}</div>
              <p className="text-xs text-violet-600">Active</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 sm:p-4">
              <CardTitle className="text-xs font-medium text-orange-700">Low Stock</CardTitle>
              <div className="p-1 rounded-lg bg-orange-100">
                <AlertTriangle className="h-3 w-3 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <div className="text-sm sm:text-lg font-bold text-orange-800">{lowStockProducts?.length || 0}</div>
              <p className="text-xs text-orange-600">Alert</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 flex-1 min-h-0">
          {/* Recent Orders */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm flex flex-col">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg p-3 sm:p-4 flex-shrink-0">
              <CardTitle className="flex items-center gap-2 text-blue-800 text-sm">
                <ShoppingCart className="h-4 w-4" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 flex-1 overflow-y-auto">
              <div className="space-y-2 sm:space-y-3">
                {recentOrders?.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-xs sm:text-sm truncate">{order.order_number}</p>
                      <p className="text-xs text-slate-500 flex items-center">
                        <Clock className="h-2 w-2 mr-1" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="font-semibold text-slate-900 text-xs sm:text-sm">PKR {order.total_amount}</p>
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "shipped"
                              ? "secondary"
                              : order.status === "processing"
                                ? "outline"
                                : "destructive"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!recentOrders || recentOrders.length === 0) && (
                  <div className="text-center py-4">
                    <ShoppingCart className="h-6 w-6 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-xs">No recent orders</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Products */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm flex flex-col">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg p-3 sm:p-4 flex-shrink-0">
              <CardTitle className="flex items-center gap-2 text-orange-800 text-sm">
                <AlertTriangle className="h-4 w-4" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 flex-1 overflow-y-auto">
              <div className="space-y-2 sm:space-y-3">
                {lowStockProducts?.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-xs sm:text-sm truncate">{product.name}</p>
                      <p className="text-xs text-slate-600">PKR {product.price}</p>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="destructive" className="animate-pulse text-xs">
                        {product.stock_quantity} left
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!lowStockProducts || lowStockProducts.length === 0) && (
                  <div className="text-center py-4">
                    <Package className="h-6 w-6 text-green-300 mx-auto mb-2" />
                    <p className="text-green-600 font-medium text-xs">All products are well stocked</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
