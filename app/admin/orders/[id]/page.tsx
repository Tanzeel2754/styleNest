import { createServiceClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: { id: string }
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const supabase = await createServiceClient()

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", params.id)
    .single()

  const { data: items } = await supabase
    .from("order_items")
    .select("*, products(name, image_url)")
    .eq("order_id", params.id)
    .order("created_at", { ascending: true })

  if (!order) {
    return (
      <div className="space-y-4">
        <p className="text-gray-600">Order not found.</p>
        <Link href="/admin/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order {order.order_number}</h1>
          <p className="text-sm text-gray-600">Placed on {new Date(order.created_at).toLocaleString()}</p>
        </div>
        <Badge>{order.status}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items?.map((item) => (
              <div key={item.id} className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <p className="font-medium">{item.products?.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                  {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                </div>
              </div>
            ))}
            {(!items || items.length === 0) && <p className="text-gray-500">No items.</p>}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal?.toFixed?.(2) ?? order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.tax_amount?.toFixed?.(2) ?? order.tax_amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${order.shipping_amount?.toFixed?.(2) ?? order.shipping_amount}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span>${order.total_amount?.toFixed?.(2) ?? order.total_amount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-1">
              {order.shipping_address ? (
                <>
                  <p>
                    {order.shipping_address.firstName} {order.shipping_address.lastName}
                  </p>
                  <p>{order.shipping_address.address}</p>
                  <p>
                    {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zipCode}
                  </p>
                  <p>{order.shipping_address.phone}</p>
                </>
              ) : (
                <p>No shipping address.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Link href="/admin/orders">
        <Button variant="outline">Back to Orders</Button>
      </Link>
    </div>
  )
}


