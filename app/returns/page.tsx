import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, ShieldCheck, Truck, Clock } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 text-white flex items-center justify-center shadow">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">Returns & Exchanges</h1>
        </div>
        <p className="text-slate-600 mb-8 text-lg">Give confidence to customers about returns and exchanges.</p>

        <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
          <CardContent className="p-2 md:p-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="period">
                <AccordionTrigger className="text-slate-900"><Clock className="w-4 h-4 mr-2 text-violet-700" /> Return Period</AccordionTrigger>
                <AccordionContent className="text-slate-700">Items can be returned/exchanged within 7 days of delivery.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="condition">
                <AccordionTrigger className="text-slate-900"><ShieldCheck className="w-4 h-4 mr-2 text-violet-700" /> Condition</AccordionTrigger>
                <AccordionContent className="text-slate-700">Product must be unused, in original packaging, and with tags attached.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="refund">
                <AccordionTrigger className="text-slate-900"><RotateCcw className="w-4 h-4 mr-2 text-violet-700" /> Refund/Exchange Policy</AccordionTrigger>
                <AccordionContent className="text-slate-700">Refunds are processed within 7 working days to the original payment method, or you may opt for an exchange.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-slate-900"><Truck className="w-4 h-4 mr-2 text-violet-700" /> Return Shipping</AccordionTrigger>
                <AccordionContent className="text-slate-700">Customer is responsible for return shipping costs unless the item is defective or incorrect.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
