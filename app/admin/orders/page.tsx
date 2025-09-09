import { createServiceClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Package, Truck, CheckCircle, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default async function AdminOrdersPage() {
  const supabase = await createServiceClient()

  // Get all orders (no join dependency on FK metadata)
  const { data: orders } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "outline"
      case "processing":
        return "secondary"
      case "shipped":
        return "default"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 text-white flex items-center justify-center shadow-lg">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">Orders</h1>
            <p className="text-slate-600 text-xs sm:text-sm">Manage customer orders and fulfillment</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="space-y-3 sm:space-y-4">
            {orders?.map((order) => (
              <Card key={order.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                        <h3 className="font-semibold text-lg sm:text-xl text-slate-900">{order.order_number}</h3>
                        <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1 shadow-lg w-fit">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="font-medium text-slate-900 mb-1 text-xs">Customer</p>
                          <p className="text-slate-700 text-xs">User ID: {order.user_id}</p>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="font-medium text-slate-900 mb-1 text-xs">Order Details</p>
                          <p className="text-slate-700 text-xs">
                            Total: <span className="font-semibold text-green-600">PKR {order.total_amount}</span>
                          </p>
                          <p className="text-slate-700 text-xs">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                          <p className="font-medium text-slate-900 mb-1 text-xs">Shipping Address</p>
                          {order.shipping_address ? (
                            <div className="text-slate-700 text-xs">
                              <p>
                                {order.shipping_address.firstName} {order.shipping_address.lastName}
                              </p>
                              <p>{order.shipping_address.address}</p>
                              <p>
                                {order.shipping_address.city}, {order.shipping_address.state}{" "}
                                {order.shipping_address.zipCode}
                              </p>
                            </div>
                          ) : (
                            <p className="text-slate-500 text-xs">No address provided</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:ml-6">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Button variant="outline" size="sm" className="bg-transparent hover:bg-violet-50 hover:border-violet-300 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </Link>

                      {order.status === "pending" && (
                        <form
                          action={async () => {
                            "use server"
                            const supabase = await createServiceClient()
                            await supabase.from("orders").update({ status: "processing" }).eq("id", order.id)
                            revalidatePath("/admin/orders")
                            revalidatePath("/admin")
                            redirect("/admin/orders")
                          }}
                        >
                          <Button size="sm" variant="outline" type="submit" className="bg-transparent hover:bg-blue-50 hover:border-blue-300 text-xs">
                            Mark Processing
                          </Button>
                        </form>
                      )}

                      {order.status === "processing" && (
                        <form
                          action={async () => {
                            "use server"
                            const supabase = await createServiceClient()
                            await supabase.from("orders").update({ status: "shipped" }).eq("id", order.id)
                            revalidatePath("/admin/orders")
                            revalidatePath("/admin")
                            redirect("/admin/orders")
                          }}
                        >
                          <Button size="sm" variant="outline" type="submit" className="bg-transparent hover:bg-orange-50 hover:border-orange-300 text-xs">
                            Mark Shipped
                          </Button>
                        </form>
                      )}

                      {order.status === "shipped" && (
                        <form
                          action={async () => {
                            "use server"
                            const supabase = await createServiceClient()
                            await supabase.from("orders").update({ status: "delivered" }).eq("id", order.id)
                            revalidatePath("/admin/orders")
                            revalidatePath("/admin")
                            redirect("/admin/orders")
                          }}
                        >
                          <Button size="sm" variant="outline" type="submit" className="bg-transparent hover:bg-green-50 hover:border-green-300 text-xs">
                            Mark Delivered
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {(!orders || orders.length === 0) && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders yet</h3>
              <p className="text-slate-600 text-sm">Orders will appear here when customers make purchases from your store.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
