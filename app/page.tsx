import Image from "next/image"
import { BlurFade } from "@/components/ui/blur-fade"
import { Meteors } from "@/components/ui/meteors"

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <Meteors number={20} />
      <div className="flex flex-col items-center text-center max-w-2xl relative z-10">
        <BlurFade delay={0.1} inView>
          <Image
            src="/wildkernels-canary/images/logo.png"
            alt="WildKernels Logo"
            width={280}
            height={280}
            className="mb-8"
            priority
          />
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl text-foreground">
            <span className="block">Innovate.</span>
            <span className="block mt-2">Build.</span>
            <span className="block mt-2">Deploy.</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
            Wild Kernels builds open-source solutions for the modern web. 
            Experience the future of development.
          </p>
        </BlurFade>
      </div>
    </main>
  )
}
