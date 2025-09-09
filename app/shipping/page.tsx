import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, DollarSign, Globe, Package } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 text-white flex items-center justify-center shadow">
            <Truck className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">Shipping Info</h1>
        </div>
        <p className="text-slate-600 mb-8 text-lg">Build trust by clarifying delivery times & costs.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Badge variant="secondary" className="justify-center bg-violet-100 text-violet-700">Free shipping over PKR 3000</Badge>
          <Badge variant="secondary" className="justify-center bg-violet-100 text-violet-700">COD nationwide</Badge>
          <Badge variant="secondary" className="justify-center bg-violet-100 text-violet-700">Trusted couriers</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold"><Clock className="w-5 h-5 text-violet-700" /> Delivery Times</div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2"><Package className="w-4 h-4 text-violet-700 mt-1" /> Lahore / Islamabad / Karachi: 2–3 business days</li>
                <li className="flex items-start gap-2"><Package className="w-4 h-4 text-violet-700 mt-1" /> Other cities: 3–5 business days</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold"><DollarSign className="w-5 h-5 text-violet-700" /> Shipping Charges</div>
              <p className="text-slate-700">Free shipping over PKR 3000, otherwise PKR 250.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold"><Truck className="w-5 h-5 text-violet-700" /> Payment & COD</div>
              <p className="text-slate-700">Cash on Delivery available nationwide.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold"><Globe className="w-5 h-5 text-violet-700" /> International Shipping</div>
              <p className="text-slate-700">Please contact us for international shipping options.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
