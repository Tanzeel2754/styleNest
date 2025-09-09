import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Ruler, Shirt } from "lucide-react"

export default function SizeGuidePage() {
  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 text-white flex items-center justify-center shadow">
            <Ruler className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">Size Guide</h1>
        </div>
        <p className="text-slate-600 mb-8 text-lg">Reduce returns by helping customers pick the correct size.</p>

        <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">How to Measure</h2>
            <ul className="list-disc list-inside text-slate-700">
              <li>Chest: Measure around the fullest part of your chest.</li>
              <li>Waist: Measure around the natural waistline.</li>
              <li>Hips: Measure around the fullest part of your hips.</li>
            </ul>
          </CardContent>
        </Card>

        <Tabs defaultValue="men" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-violet-100/60">
            <TabsTrigger value="men" className="data-[state=active]:bg-white data-[state=active]:text-violet-700">Men</TabsTrigger>
            <TabsTrigger value="women" className="data-[state=active]:bg-white data-[state=active]:text-violet-700">Women</TabsTrigger>
          </TabsList>
          <TabsContent value="men" className="mt-6">
            <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                      <tr>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3">Chest (in)</th>
                        <th className="px-4 py-3">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3">S</td>
                        <td className="px-4 py-3">36–38</td>
                        <td className="px-4 py-3">26</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">M</td>
                        <td className="px-4 py-3">38–40</td>
                        <td className="px-4 py-3">27</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">L</td>
                        <td className="px-4 py-3">40–42</td>
                        <td className="px-4 py-3">28</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">XL</td>
                        <td className="px-4 py-3">42–44</td>
                        <td className="px-4 py-3">29</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="women" className="mt-6">
            <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                      <tr>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3">Bust (in)</th>
                        <th className="px-4 py-3">Waist (in)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3">S</td>
                        <td className="px-4 py-3">32–34</td>
                        <td className="px-4 py-3">25–27</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">M</td>
                        <td className="px-4 py-3">34–36</td>
                        <td className="px-4 py-3">27–29</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">L</td>
                        <td className="px-4 py-3">36–38</td>
                        <td className="px-4 py-3">29–31</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">XL</td>
                        <td className="px-4 py-3">38–40</td>
                        <td className="px-4 py-3">31–33</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
