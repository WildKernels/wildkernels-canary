"use client"

import { MagicCard } from "@/components/ui/magic-card"
import { BlurFade } from "@/components/ui/blur-fade"
import { Smartphone, Cpu, Layers, Crown, Wrench, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const projects = [
  {
    title: "Wild KSU",
    description: "An advanced Kernel based root solution for Android.",
    icon: Smartphone,
    status: "active",
    github: "https://github.com/WildKernels/Wild_KSU",
  },
  {
    title: "GKI 5.10+ Kernels",
    description: "Generic Kernel Image (GKI) kernels with KernelSU & SUSFS support",
    icon: Cpu,
    status: "active",
    github: "https://github.com/WildKernels/GKI_KernelSU_SUSFS",
  },
  {
    title: "OnePlus Kernels",
    description: "Optimized kernels for OnePlus devices with KernelSU & SUSFS support",
    icon: Layers,
    status: "active",
    github: "https://github.com/WildKernels/OnePlus_KernelSU_SUSFS",
  },
  {
    title: "Sultan Kernels",
    description: "Sultan kernels for Pixel 6-9 series with KernelSU & SUSFS integration.",
    icon: Crown,
    status: "active",
    github: "https://github.com/WildKernels/Sultan_KernelSU_SUSFS",
  },
  {
    title: "Samsung Kernels",
    description: "Work in Progress. Kernels for Samsung devices with KernelSU & SUSFS support",
    icon: Wrench,
    status: "wip",
    github: "https://github.com/WildKernels/Samsung_KernelSU_SUSFS",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-20 pb-32">
      <div className="w-full max-w-6xl">
        <BlurFade delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Our Projects
          </h1>
        </BlurFade>
        <BlurFade delay={0.2}>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Explore our open-source kernel solutions
          </p>
        </BlurFade>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <BlurFade key={project.title} delay={0.3 + index * 0.1}>
              <MagicCard 
                className="relative h-full p-6 cursor-pointer overflow-hidden"
                gradientColor="rgba(34, 197, 94, 0.15)"
              >
                <div className="flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <project.icon className="h-6 w-6 text-green-500" />
                    </div>
                    {project.status === "wip" && (
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-500 font-medium">
                        WIP
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-grow">
                    {project.description}
                  </p>
                  {project.github && (
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                  )}
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </main>
  )
}
