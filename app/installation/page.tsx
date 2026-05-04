import { Suspense } from "react"
import InstallationPageClient from "./client"

export const metadata = {
  title: "Installation - WildKernels",
  description: "Install WildKernels on your device",
}

export default function InstallationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <InstallationPageClient />
    </Suspense>
  )
}
