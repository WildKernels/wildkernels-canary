"use client"

import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { Check, X } from "lucide-react"

const devices = [
  {
    name: "Xiaomi 13T Pro / Redmi K60 Ultra",
    codename: "corot",
    brand: "XIAOMI",
    status: "GKI",
    features: ["Thermal management", "Performance boost", "Battery optimization"],
    knownLimitations: ["git push test"],
    rom: "sgtock",
    romKernel: "sgtock kernel",
    workingKernel: "Wild Kernels GKI 1.0",
    kernelVariants: [
      { hos: "HOS 3", kernel: "Wild Kernels GKI 1.0" },
      { hos: "HOS 2", kernel: "Wild Kernels GKI 0.9" },
    ],
    compatibleKernels: [
      { description: "HOS 2 compatible alternative", kernel: "Wild Kernels GKI 0.8" },
    ],
    lastConfirmed: "May 3, 2026",
  },
]

export default function SupportedDevicesPage() {
  const device = devices[0]

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 pb-32">
      <div className="w-full max-w-6xl">
        <BlurFade delay={0.1} inView>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            GKI Devices
          </h1>
        </BlurFade>
        
        <BlurFade delay={0.2} inView>
          <p className="text-muted-foreground mb-8">
            Wild Kernels GKI support is currently listed for the Xiaomi device below. This page shows the device features, known limitations, and ROM/kernel details.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 gap-6 mb-12">
          <BlurFade delay={0.3} inView>
            <MagicCard className="flex flex-col h-full p-6 bg-slate-900/50 border border-slate-800">
              <div className="mb-4">
                <h2 className="font-bold text-lg text-foreground mb-1">{device.name}</h2>
                <p className="text-xs text-muted-foreground font-mono">Codename: {device.codename}</p>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                  {device.brand}
                </span>
                <span className="text-xs font-medium px-2 py-1 rounded-full inline-block bg-green-500/20 text-green-500">
                  {device.status}
                </span>
              </div>

              <div className="space-y-6 flex-1">
                {device.features.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-green-500 mb-2 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Features
                    </h3>
                    <ul className="space-y-1">
                      {device.features.map((item) => (
                        <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {device.knownLimitations.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-amber-500 mb-2 flex items-center gap-1">
                      <X className="h-3 w-3" /> Known Limitations
                    </h3>
                    <ul className="space-y-1">
                      {device.knownLimitations.map((item) => (
                        <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {device.kernelVariants && device.kernelVariants.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-sky-400 mb-2">
                      Kernel Variants by HOS
                    </h3>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {device.kernelVariants.map((variant) => (
                        <li key={`${variant.hos}-${variant.kernel}`} className="flex justify-between gap-4">
                          <span className="font-medium text-slate-200">{variant.hos}</span>
                          <span>{variant.kernel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {device.compatibleKernels && device.compatibleKernels.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-sky-400 mb-2">
                      Compatible Alternatives
                    </h3>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {device.compatibleKernels.map((item) => (
                        <li key={item.kernel} className="flex justify-between gap-4">
                          <span className="font-medium text-slate-200">{item.description}</span>
                          <span>{item.kernel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex justify-between border-t border-slate-800 pt-4">
                    <span className="text-slate-300">ROM:</span>
                    <span>{device.rom}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-4">
                    <span className="text-slate-300">ROM Kernel:</span>
                    <span>{device.romKernel}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-4">
                    <span className="text-slate-300">Working Kernel:</span>
                    <span>{device.workingKernel}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-4">
                    <span className="text-slate-300">Last Confirmed:</span>
                    <span>{device.lastConfirmed}</span>
                  </div>
                </div>
              </div>
            </MagicCard>
          </BlurFade>
        </div>

        {/* Coming Soon Info Section */}
        <BlurFade delay={0.7} inView className="mb-12">
          <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg">
            <h3 className="text-amber-500 font-semibold mb-2">Tested & Working on Your Device?</h3>
            <p className="text-amber-500/80 text-sm mb-4">
              If you've successfully tested Wild Kernels on a device not listed as officially supported, 
              please report it in our <strong>Telegram group</strong> with details about your testing. 
              We'll verify and add it to the official supported devices list!
            </p>
            <a
              href="https://t.me/WildKernelsTG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500/50 text-amber-500 rounded-full text-sm font-semibold hover:bg-amber-500/30 transition-colors"
            >
              Join Telegram Group →
            </a>
          </div>
        </BlurFade>

        <BlurFade delay={0.8} inView>
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-500 text-sm">
              <strong>Note:</strong> Device support and feature availability may change with kernel updates. 
              Always check the latest release notes before flashing. If you encounter issues, please report them on our GitHub repository.
            </p>
          </div>
        </BlurFade>
      </div>
    </main>
  )
}
