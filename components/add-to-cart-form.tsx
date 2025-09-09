"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Heart, Share2 } from "lucide-react"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  image_url: string
  sizes?: string[]
  colors?: string[]
  stock_quantity: number
}

interface AddToCartFormProps {
  product: Product
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size")
      return
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a color")
      return
    }

    setIsAdding(true)

    try {
      addToCart({
        product_id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        size: selectedSize || undefined,
        color: selectedColor || undefined,
        quantity,
        slug: product.slug,
      })

      // Show success feedback
      alert("Added to cart!")
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add to cart")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                className="min-w-[3rem]"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? "default" : "outline"}
                size="sm"
                className="min-w-[4rem]"
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
            disabled={quantity >= product.stock_quantity}
          >
            +
          </Button>
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${product.stock_quantity > 0 ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-sm text-gray-600">
          {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}
        </span>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button
            size="lg"
            className="flex-1"
            disabled={product.stock_quantity === 0 || isAdding}
            onClick={handleAddToCart}
          >
            {isAdding ? "Adding..." : product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button size="lg" variant="outline">
            <Heart className="h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Button variant="outline" size="lg" className="w-full bg-transparent">
          Buy Now
        </Button>
      </div>
    </div>
  )
}
