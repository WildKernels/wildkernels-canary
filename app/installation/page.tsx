"use client"

import { BlurFade } from "@/components/ui/blur-fade"
import { Terminal } from "@/components/ui/terminal"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function InstallationPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (command: string, index: number) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(command)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
      }
    } catch (err) {
      console.error('Failed to copy command:', err)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 pb-32">
      <div className="w-full max-w-2xl">
        <BlurFade delay={0.1} inView>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            Installation
          </h1>
        </BlurFade>
        
        <BlurFade delay={0.2} inView>
          <p className="text-muted-foreground mb-8">
            Follow these steps to flash a Wild Kernels kernel on your Android device.
            Make sure you have ADB and Fastboot installed on your computer.
          </p>
        </BlurFade>

        {/* Step 1: List devices */}
        <BlurFade delay={0.3} inView className="mb-8">
          <Terminal title="powershell">
            <div className="flex items-center justify-between group mb-2">
              <div className="flex-1">
                <TypingAnimation className="text-foreground" duration={50}>
                  &gt; adb devices
                </TypingAnimation>
              </div>
              <button
                onClick={() => copyToClipboard("adb devices", 0)}
                className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 ml-2"
                title="Copy command"
              >
                {copiedIndex === 0 ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>

            <BlurFade delay={0.6} inView>
              <span className="text-green-500">List of devices attached</span>
            </BlurFade>
            
            <BlurFade delay={0.8} inView>
              <span className="text-green-500">HT1A12345678 device</span>
            </BlurFade>
          </Terminal>
        </BlurFade>

        {/* Step 2: Reboot bootloader */}
        <BlurFade delay={0.4} inView className="mb-8">
          <Terminal title="powershell">
            <div className="flex items-center justify-between group mb-2">
              <div className="flex-1">
                <TypingAnimation className="text-foreground" duration={50}>
                  &gt; adb reboot bootloader
                </TypingAnimation>
              </div>
              <button
                onClick={() => copyToClipboard("adb reboot bootloader", 1)}
                className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 ml-2"
                title="Copy command"
              >
                {copiedIndex === 1 ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>

            <BlurFade delay={0.8} inView>
              <span className="text-blue-500">ℹ Rebooting to bootloader...</span>
            </BlurFade>
          </Terminal>
        </BlurFade>

        {/* Step 3: Verify fastboot devices */}
        <BlurFade delay={0.5} inView className="mb-8">
          <Terminal title="powershell">
            <div className="flex items-center justify-between group mb-2">
              <div className="flex-1">
                <TypingAnimation className="text-foreground" duration={50}>
                  &gt; fastboot devices
                </TypingAnimation>
              </div>
              <button
                onClick={() => copyToClipboard("fastboot devices", 2)}
                className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 ml-2"
                title="Copy command"
              >
                {copiedIndex === 2 ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>

            <BlurFade delay={0.8} inView>
              <span className="text-green-500">HT1A12345678 fastboot</span>
            </BlurFade>
          </Terminal>
        </BlurFade>

        {/* Step 4: Flash kernel */}
        <BlurFade delay={0.6} inView className="mb-8">
          <Terminal title="powershell">
            <div className="flex items-center justify-between group mb-2">
              <div className="flex-1">
                <TypingAnimation className="text-foreground" duration={50}>
                  &gt; fastboot flash boot kernel.img
                </TypingAnimation>
              </div>
              <button
                onClick={() => copyToClipboard("fastboot flash boot kernel.img", 3)}
                className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 ml-2"
                title="Copy command"
              >
                {copiedIndex === 3 ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>

            <BlurFade delay={0.8} inView>
              <span className="text-green-500">Sending 'boot' (12345 KB) OKAY</span>
            </BlurFade>

            <BlurFade delay={1} inView>
              <span className="text-green-500">Writing 'boot' OKAY</span>
            </BlurFade>
          </Terminal>
        </BlurFade>

        {/* Step 5: Reboot device */}
        <BlurFade delay={0.7} inView className="mb-8">
          <Terminal title="powershell">
            <div className="flex items-center justify-between group mb-2">
              <div className="flex-1">
                <TypingAnimation className="text-foreground" duration={50}>
                  &gt; fastboot reboot
                </TypingAnimation>
              </div>
              <button
                onClick={() => copyToClipboard("fastboot reboot", 4)}
                className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 ml-2"
                title="Copy command"
              >
                {copiedIndex === 4 ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>

            <BlurFade delay={0.8} inView>
              <span className="text-blue-500">ℹ Rebooting device...</span>
            </BlurFade>

            <BlurFade delay={1.2} inView>
              <span className="text-green-500">Success! Kernel installation completed.</span>
            </BlurFade>

            <BlurFade delay={1.6} inView>
              <span className="text-green-500">Your device will now boot with the new Wild Kernels kernel.</span>
            </BlurFade>
          </Terminal>
        </BlurFade>

        <BlurFade delay={0.9} inView>
          <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-amber-500 text-sm">
              <strong>Warning:</strong> Flashing a custom kernel may void your warranty 
              and could potentially brick your device. Proceed at your own risk and make 
              sure to backup your data.
            </p>
          </div>
        </BlurFade>
      </div>
    </main>
  )
}
