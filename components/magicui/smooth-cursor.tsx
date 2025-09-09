"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

export default function SmoothCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 150, mass: 0.4 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const translateX = useTransform(cursorX, (v) => `${v}px`)
  const translateY = useTransform(cursorY, (v) => `${v}px`)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ translateX, translateY }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className="h-6 w-6 rounded-full bg-violet-500/20 blur-md" />
        <div className="-mt-6 h-3 w-3 rounded-full bg-violet-600 shadow-[0_0_30px_rgba(124,58,237,0.6)]" />
      </div>
    </motion.div>
  )
}
