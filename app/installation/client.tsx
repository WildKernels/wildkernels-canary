"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { Terminal } from "@/components/ui/terminal"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MagicCard } from "@/components/ui/magic-card"
import { Copy, Check, ChevronLeft, ChevronRight, Download, ExternalLink, CheckCircle2 } from "lucide-react"
import Link from "next/link"

type FirmwareLink = {
  name: string
  link: string
}

type BrandFirmwareLinks = Record<string, FirmwareLink[]>

const installationMethods = [
  { id: "twp", name: "AnyKernel3 via TWRP", difficulty: "Easy", description: "Flash via custom recovery", requiresAdb: true },
  { id: "ksu", name: "Boot Image patching via KSUN Manager", difficulty: "Medium", description: "Use KSUN Manager app", requiresAdb: false },
  { id: "fastboot", name: "Direct Fastboot flash", difficulty: "Medium", description: "Direct fastboot commands", requiresAdb: true },
  { id: "ksu_post", name: "AnyKernel3 + KSUN post-install", difficulty: "Medium", description: "Combined approach", requiresAdb: true },
  { id: "manager", name: "AnyKernel3 via Kernel Manager App", difficulty: "Easy", description: "No PC required", requiresAdb: false },
]

const brandFirmwareLinks: BrandFirmwareLinks = {
  "Xiaomi ROM": [
    { name: "MiFirm", link: "https://mifirm.net/" },
    { name: "Official Download from Xiaomi Community (may not have newest version)", link: "https://new.c.mi.com/global/miuidownload/index" },
  ],
  Samsung: [
    { name: "SamFW", link: "https://samfw.com/" },
  ],
  OnePlus: [
    { name: "OnePlus, havent found one, if you have one tell @zqxr4 in the telegram group)", link: "https://example.com/oneplus-ace2" },
  ],
}

export default function InstallationPageClient() {
  const searchParams = useSearchParams()
  const methodParam = searchParams.get("method")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(methodParam || null)
  const [currentStep, setCurrentStep] = useState(1)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const method = useMemo(() => installationMethods.find(m => m.id === selectedMethod), [selectedMethod])
  
  const steps = useMemo(() => {
    if (!method) return []
    const baseSteps = [
      { id: 1, title: "Prerequisites", description: "Prepare your device and tools" },
    ]
    if (method.requiresAdb) {
      baseSteps.push({ id: 2, title: "ADB & Fastboot Setup", description: "Set up ADB and Fastboot tools" })
    }
    baseSteps.push({ id: baseSteps.length + 1, title: "Download Files", description: "Get all required files" })
    baseSteps.push({ id: baseSteps.length + 1, title: "Installation", description: "Flash the kernel" })
    baseSteps.push({ id: baseSteps.length + 1, title: "Verify & Done", description: "Confirm installation success" })
    return baseSteps
  }, [method])

  useEffect(() => {
    if (methodParam && !selectedMethod) {
      setSelectedMethod(methodParam)
    }
  }, [methodParam, selectedMethod])

  const progress = steps.length > 0 ? (currentStep / steps.length) * 100 : 0

  const copyToClipboard = async (command: string, index: number) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(command)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
      }
    } catch (err) {
      console.error("Failed to copy command:", err)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    if (!method || steps.length === 0) return null
    const stepTitle = steps[currentStep - 1]?.title
    
    if (stepTitle === "Prerequisites") {
      return (
        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="adb">
              <AccordionTrigger>ADB & Fastboot</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Option A: PowerShell One-liner</h4>
                    <Terminal title="powershell">
                      <div className="flex items-center justify-between group">
                        <div className="flex-1">
                          <TypingAnimation className="text-foreground" duration={15}>
                            &gt; Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/coderello/platform-tools-installer/master/install.ps1'))
                          </TypingAnimation>
                        </div>
                        <button onClick={() => copyToClipboard("Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/coderello/platform-tools-installer/master/install.ps1'))", 100)} className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 ml-2" title="Copy command">
                          {copiedIndex === 100 ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </Terminal>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Option B: Manual Download</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Download Android Platform Tools from{" "}
                      <Link href="https://developer.android.com/tools/releases/platform-tools" className="text-primary hover:underline" target="_blank">
                        Google's official site
                      </Link>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bootloader">
              <AccordionTrigger>Unlocked Bootloader</AccordionTrigger>
              <AccordionContent>
                <Alert>
                  <AlertDescription>
                    Your device's bootloader must be unlocked to install custom kernels. This process varies by device manufacturer.
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="recovery">
              <AccordionTrigger>Custom Recovery (TWRP) - Optional</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Download TWRP for your device from{" "}
                  <Link href="https://twrp.me" className="text-primary hover:underline" target="_blank">
                    twrp.me
                  </Link>
                  {method.id === "twp" && " (Required for this method)"}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usb">
              <AccordionTrigger>USB Debugging</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Enable Developer Options and USB Debugging in Android Settings → Developer Options → USB Debugging
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="kernel">
              <AccordionTrigger>Download WildKernels ZIP</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Get the latest WildKernels release from{" "}
                  <Link href="https://github.com/wildkernels/releases" className="text-primary hover:underline" target="_blank">
                    GitHub Releases
                  </Link>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )
    }

    if (method.requiresAdb && stepTitle === "ADB & Fastboot Setup") {
      return (
        <div className="space-y-6">
          <Terminal title="powershell">
            <div className="flex items-center justify-between group mb-2">
              <div className="flex-1">
                <TypingAnimation className="text-foreground" duration={15}>
                  &gt; adb devices
                </TypingAnimation>
              </div>
              <button onClick={() => copyToClipboard("adb devices", 0)} className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 ml-2" title="Copy command">
                {copiedIndex === 0 ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
            <span className="text-green-500">List of devices attached</span>
            <span className="text-green-500">HT1A12345678 device</span>
          </Terminal>
        </div>
      )
    }

    if (stepTitle === "Download Files") {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                WildKernels ZIP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="https://github.com/wildkernels/releases" target="_blank">
                  Download
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                KSUN Manager APK
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="https://github.com/KSUNManager" target="_blank">
                  Download
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Brand-Specific Firmware</CardTitle>
              <CardDescription>Select your device brand to view firmware downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {Object.entries(brandFirmwareLinks).map(([brand, devices]) => (
                  <MagicCard key={brand} className="p-4" gradientColor="rgba(34, 197, 94, 0.15)">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={brand}>
                        <AccordionTrigger className="hover:no-underline">
                          <span className="font-semibold">{brand}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {devices.map((device: FirmwareLink) => (
                              <Button key={device.name} asChild variant="outline" className="w-full justify-start">
                                <Link href={device.link} target="_blank">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  {device.name}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </MagicCard>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (stepTitle === "Installation") {
      return (
        <div className="space-y-6">
          <p className="text-muted-foreground">Installation steps for {method.name}</p>
        </div>
      )
    }

    if (stepTitle === "Verify & Done") {
      return (
        <div className="text-center space-y-6">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          <h3 className="text-2xl font-bold">Installation Complete!</h3>
          <p className="text-muted-foreground">Your device has been successfully updated with WildKernels.</p>
        </div>
      )
    }

    return null
  }

  if (!selectedMethod) {
    return (
      <main className="min-h-screen flex flex-col items-center px-4 py-16 pb-32">
        <div className="w-full max-w-4xl">
          <BlurFade delay={0.1} inView>
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Installation Method
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="text-muted-foreground mb-8">
              Select the installation method that best suits your device and preferences. Prerequisites vary by method.
            </p>
          </BlurFade>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {installationMethods.map((meth) => (
              <Card
                key={meth.id}
                className="cursor-pointer transition-all hover:shadow-lg"
                onClick={() => {
                  setSelectedMethod(meth.id)
                  setCurrentStep(1)
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{meth.name}</CardTitle>
                    <Badge variant={meth.difficulty === "Easy" ? "default" : "secondary"}>
                      {meth.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{meth.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 pb-32">
      <div className="w-full max-w-4xl">
        <BlurFade delay={0.1} inView>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            {method?.name}
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="text-muted-foreground mb-8">
            {method?.description}
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 overflow-x-auto pb-2">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex flex-col items-center whitespace-nowrap">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    idx + 1 <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.title}</span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </BlurFade>

        <BlurFade key={currentStep} delay={0.4} inView>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{steps[currentStep - 1]?.title}</h2>
            <p className="text-muted-foreground mb-6">{steps[currentStep - 1]?.description}</p>
            {renderStepContent()}
          </div>
        </BlurFade>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep === 1) {
                setSelectedMethod(null)
                setCurrentStep(1)
              } else {
                prevStep()
              }
            }}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentStep === 1 ? "Back to Methods" : "Back"}
          </Button>
          <span className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</span>
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}
