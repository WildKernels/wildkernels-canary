import Image from "next/image"
import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
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

        <BlurFade delay={0.6} inView>
          <section className="mt-16 w-full flex justify-center lg:justify-end">
            <MagicCard className="w-full max-w-[420px] p-6" gradientColor="rgba(34, 197, 94, 0.15)">
              <div className="relative w-full overflow-hidden rounded-[3rem] border border-border bg-background shadow-[0_24px_80px_-40px_rgba(34,197,94,0.5)] dark:border-slate-700 dark:bg-slate-950">
                <div className="absolute inset-x-0 top-3 flex justify-center">
                  <div className="h-1.5 w-20 rounded-full bg-slate-300 dark:bg-slate-600" />
                </div>
                <div className="relative mt-6 w-full overflow-hidden rounded-[2rem] bg-black aspect-[1220/2712]">
                  <Image
                    src="/wildkernels-canary/images/ksun-day.jpg"
                    alt="Wild Kernels screenshot light mode"
                    fill
                    className="object-cover block dark:hidden"
                  />
                  <Image
                    src="/wildkernels-canary/images/ksun-night.jpg"
                    alt="Wild Kernels screenshot dark mode"
                    fill
                    className="object-cover hidden dark:block"
                  />
                </div>
              </div>
            </MagicCard>
          </section>
        </BlurFade>
      </div>
    </main>
  )
}
