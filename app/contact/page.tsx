import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Instagram, Facebook, Music2, Sparkles } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 text-white flex items-center justify-center shadow">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">
            Contact Us
          </h1>
        </div>
        <p className="text-slate-600 mb-10 text-lg">We’d love to hear from you. Reach us anytime.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 flex items-start gap-3">
              <div className="p-2 rounded-md bg-violet-100 text-violet-700"><Mail className="w-5 h-5" /></div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <a href="mailto:support@yourstore.com" className="font-semibold text-slate-900 hover:text-violet-700">support@yourstore.com</a>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 flex items-start gap-3">
              <div className="p-2 rounded-md bg-violet-100 text-violet-700"><Phone className="w-5 h-5" /></div>
              <div>
                <p className="text-sm text-slate-500">Phone / WhatsApp</p>
                <p className="font-semibold text-slate-900">+92 XXX-XXXXXXX</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 flex items-start gap-3">
              <div className="p-2 rounded-md bg-violet-100 text-violet-700"><MapPin className="w-5 h-5" /></div>
              <div>
                <p className="text-sm text-slate-500">Address</p>
                <p className="font-semibold text-slate-900">Lahore, Pakistan</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
              <form
                action="mailto:support@yourstore.com"
                method="post"
                encType="text/plain"
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                      id="name"
                      name="Name"
                      type="text"
                      required
                      className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      id="email"
                      name="Email"
                      type="email"
                      required
                      className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-200"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="Message"
                    rows={6}
                    required
                    className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-200"
                  />
                </div>
                <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Follow us</h2>
              <ul className="space-y-3">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-violet-700">
                    <Instagram className="w-5 h-5" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-violet-700">
                    <Facebook className="w-5 h-5" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-violet-700">
                    <Music2 className="w-5 h-5" /> TikTok
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
