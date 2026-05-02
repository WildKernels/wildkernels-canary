"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedSpanProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedSpan({
  children,
  className,
  delay = 0,
}: AnimatedSpanProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
