"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderKanban, Download, Info, Smartphone, Menu, X, ChevronDown } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDevice } from "@/components/device-context"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/projects", icon: FolderKanban, label: "Projects" },
  { href: "/installation", icon: Download, label: "Installation" },
  { href: "/supported-devices", icon: Smartphone, label: "Devices" },
  { href: "/about", icon: Info, label: "About" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { selectedDevice, setSelectedDevice, deviceFirmwareLinks } = useDevice()

  const isInstallationPage = pathname === "/installation"

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="text-base font-semibold tracking-tight transition-colors hover:text-foreground/80">
          WildKernels
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-secondary/90 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className={cn(
          "flex flex-col gap-2 rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur-md transition-all md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none",
          open ? "block w-full mt-3 md:mt-0" : "hidden md:flex md:w-auto"
        )}>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            {isInstallationPage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition text-foreground/80 hover:bg-accent hover:text-accent-foreground">
                    <Smartphone className="h-4 w-4" />
                    <span>{selectedDevice || "Select Device"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {Object.keys(deviceFirmwareLinks).map((device) => (
                    <DropdownMenuItem
                      key={device}
                      onClick={() => setSelectedDevice(device)}
                      className={cn(selectedDevice === device && "bg-accent")}
                    >
                      {device}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div className="flex justify-end md:justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
