"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function CartButton() {
  const { state } = useCart()

  return (
    <Link href="/cart">
      <Button size="sm" className="relative">
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart ({state.itemCount})
        {state.itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {state.itemCount > 9 ? "9+" : state.itemCount}
          </span>
        )}
      </Button>
    </Link>
  )
}
