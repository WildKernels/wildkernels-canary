"use client"

import { useEffect, useState } from "react"
import { TextAnimate } from "@/components/ui/text-animate"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let lastScrollY = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrolledDown = currentScrollY > lastScrollY
      const shouldShow = currentScrollY > 40 && scrolledDown

      setIsVisible(shouldShow)
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-50 pointer-events-none transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-800 py-3">
        <div className="flex justify-center items-center gap-1">
          <span className="text-sm text-zinc-500">made by</span>
          <a
            href="https://github.com/zqxr4"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto hover:opacity-80 transition-opacity"
          >
            <TextAnimate
              animation="blurInUp"
              by="character"
              once
              className="text-sm font-medium text-green-500"
            >
              @zqxr4
            </TextAnimate>
          </a>
        </div>
      </div>
    </footer>
  )
}
