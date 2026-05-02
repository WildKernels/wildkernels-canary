"use client"

import React, { useState } from "react"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { MagicCard } from "@/components/ui/magic-card"
import { cn } from "@/lib/utils"
import { Copy, Check } from "lucide-react"

interface TerminalLine {
  command: string
  description?: string
  active?: boolean
}

interface TerminalProps {
  title?: string
  lines?: TerminalLine[]
  className?: string
  children?: React.ReactNode
}

export function Terminal({
  title = "Terminal",
  lines,
  className,
  children,
}: TerminalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (command: string, index: number) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(command)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
      } else {
        // Fallback for environments without clipboard API
        console.warn('Clipboard API not available')
      }
    } catch (err) {
      console.error('Failed to copy command:', err)
    }
  }
  return (
    <MagicCard className={cn("overflow-hidden rounded-[2rem] border border-zinc-800 shadow-2xl", className)}>
      <div className="bg-zinc-950/95 border-b border-zinc-800 px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
        </div>
        <span className="text-xs uppercase tracking-[0.32em] text-zinc-500">{title}</span>
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-900/90" />
      </div>

      <div className="bg-zinc-950 px-5 py-6">
        {children ? (
          <div className="font-mono text-sm text-zinc-100">
            {children}
          </div>
        ) : (
          <div className="space-y-4">
            {lines?.map((line, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-3xl border border-white/5 bg-zinc-900/90 p-4 transition",
                  line.active ? "ring-1 ring-primary/50 bg-zinc-800/90" : ""
                )}
              >
                <div className="flex items-center gap-3 text-zinc-400 text-[11px] uppercase tracking-[0.28em]">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{line.description ?? "command"}</span>
                </div>
                <div className="mt-3 font-mono text-sm text-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">$</span>{" "}
                    <TypingAnimation
                      className="inline text-zinc-100"
                      duration={35}
                      delay={index * 150}
                      showCursor={false}
                    >
                      {line.command}
                    </TypingAnimation>
                  </div>
                  <button
                    onClick={() => copyToClipboard(line.command, index)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
                    title="Copy command"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MagicCard>
  )
}
