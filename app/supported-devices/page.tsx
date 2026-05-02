"use client"

import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { Check, X, Search } from "lucide-react"
import { useState, useMemo } from "react"

export default function SupportedDevicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "supported" | "coming">("all")
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const devices = [
    {
      name: "Xiaomi 13T Pro / Redmi K60 Ultra",
      codename: "corot",
      brand: "XIAOMI",
      status: "Supported",
      works: ["Thermal management", "Performance boost", "Battery optimization"],
      notWorks: ["git push test"],
    },
    {
      name: "Google Pixel 8 Pro",
      codename: "husky",
      brand: "GOOGLE",
      status: "Supported",
      works: ["All features", "Security patches", "Performance"],
      notWorks: [],
    },
    {
      name: "Google Pixel 8",
      codename: "shiba",
      brand: "GOOGLE",
      status: "Supported",
      works: ["Core features", "Performance tuning", "Battery optimization"],
      notWorks: ["Some display profiles"],
    },
    {
      name: "Google Pixel 7 Pro",
      codename: "cheetah",
      brand: "GOOGLE",
      status: "Supported",
      works: ["Stability", "Performance", "Power management"],
      notWorks: ["Adaptive charging"],
    },
    {
      name: "OnePlus 12",
      codename: "ovs",
      brand: "ONEPLUS",
      status: "Supported",
      works: ["Performance", "Oxygen OS integration"],
      notWorks: ["Fast charging profiles"],
    },
    
  ]

  const brands = Array.from(new Set(devices.map(d => d.brand))).sort()

  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
      const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           device.codename.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || 
                           (statusFilter === "supported" && device.status === "Supported") ||
                           (statusFilter === "coming" && device.status === "Coming Soon")
      const matchesBrand = !selectedBrand || device.brand === selectedBrand

      return matchesSearch && matchesStatus && matchesBrand
    })
  }, [searchQuery, statusFilter, selectedBrand])

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 pb-32">
      <div className="w-full max-w-6xl">
        <BlurFade delay={0.1} inView>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            Supported Devices (Canary! Most of the entrys are wrong! Just a showcase of how it can work!)
          </h1>
        </BlurFade>
        
        <BlurFade delay={0.2} inView>
          <p className="text-muted-foreground mb-8">
            Wild Kernels is currently available for the following devices. Search and filter to find your device.
          </p>
        </BlurFade>

        {/* Search Bar */}
        <BlurFade delay={0.25} inView className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${devices.length} devices`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>
        </BlurFade>

        {/* Brand Filter Buttons */}
        <BlurFade delay={0.35} inView className="mb-12 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedBrand(null)}
            className={`px-4 py-2 rounded-full border-2 transition-all font-semibold text-sm ${
              selectedBrand === null
                ? "border-blue-500 text-blue-500 bg-blue-500/10"
                : "border-slate-600 text-slate-300 hover:border-slate-500"
            }`}
          >
            ALL BRANDS
          </button>
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 rounded-full border-2 transition-all font-semibold text-sm ${
                selectedBrand === brand
                  ? "border-blue-500 text-blue-500 bg-blue-500/10"
                  : "border-slate-600 text-slate-300 hover:border-slate-500"
              }`}
            >
              {brand}
            </button>
          ))}
        </BlurFade>

        {/* Device Count */}
        <BlurFade delay={0.4} inView className="mb-6">
          <p className="text-center text-muted-foreground text-sm">
            Showing {filteredDevices.length} of {devices.length} devices
          </p>
        </BlurFade>

        {/* Devices Grid */}
        {filteredDevices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredDevices.map((device, index) => (
              <BlurFade key={device.codename} delay={0.4 + index * 0.05} inView>
                <MagicCard className="flex flex-col h-full p-6 bg-slate-900/50 border border-slate-800">
                  <div className="mb-4">
                    <h2 className="font-bold text-lg text-foreground mb-1">{device.name}</h2>
                    <p className="text-xs text-muted-foreground font-mono">Codename: {device.codename}</p>
                  </div>

                  <div className="mb-4 flex gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                      {device.brand}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                      device.status === "Supported"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-amber-500/20 text-amber-500"
                    }`}>
                      {device.status}
                    </span>
                  </div>

                  {device.status === "Supported" && (
                    <div className="space-y-3 flex-1">
                      {device.works.length > 0 && (
                        <div>
                          <h3 className="text-xs font-semibold text-green-500 mb-2 flex items-center gap-1">
                            <Check className="h-3 w-3" /> Works
                          </h3>
                          <ul className="space-y-1">
                            {device.works.map((item) => (
                              <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {device.notWorks.length > 0 && (
                        <div>
                          <h3 className="text-xs font-semibold text-amber-500 mb-2 flex items-center gap-1">
                            <X className="h-3 w-3" /> Known Limitations
                          </h3>
                          <ul className="space-y-1">
                            {device.notWorks.map((item) => (
                              <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        ) : (
          <BlurFade delay={0.4} inView className="mb-12">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No devices found matching your filters.</p>
            </div>
          </BlurFade>
        )}

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
