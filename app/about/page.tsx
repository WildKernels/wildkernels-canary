import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { MessageCircle, Github, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const developers = [
  {
    name: "fatalcoder524",
    role: "Developer for OnePlus Kernels",
    github: "https://github.com/fatalcoder524",
    avatar: "/wildkernels-canary/images/avatar_fatalcoder524.png",
  },
  {
    name: "jimsterino98",
    role: "Developer for Samsung Kernels",
    github: "https://github.com/jimsterino98",
    avatar: "/wildkernels-canary/images/avatar_jimsterino98.png",
  },
  {
    name: "Zaikura",
    role: "Website Developer",
    github: "https://github.com/zqxr4",
    avatar: "/wildkernels-canary/images/avatar_zaikura.png",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 pb-32">
      <div className="max-w-4xl w-full">
        <BlurFade delay={0.1}>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-6xl text-center mb-12">
            Contact Us
          </h1>
        </BlurFade>

        <BlurFade delay={0.2}>
          <section className="mb-12">
            <div className="grid gap-4 md:grid-cols-3">
              <BlurFade delay={0.2}>
                <MagicCard
                  className="p-6 h-full"
                  gradientColor="rgba(34, 197, 94, 0.15)"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mb-4">
                      <MessageCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">
                      General Information
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Join our community chat for updates, discussions, and general inquiries.
                    </p>
                    <Button asChild className="gap-2 bg-green-600 hover:bg-green-700">
                      <Link href="https://t.me/wildkernels" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        Join Telegram
                      </Link>
                    </Button>
                  </div>
                </MagicCard>
              </BlurFade>
              <BlurFade delay={0.3}>
                <MagicCard
                  className="p-6 h-full"
                  gradientColor="rgba(34, 197, 94, 0.15)"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-green-500/30">
                      <Image
                        src="/wildkernels-canary/images/avatar_thewildjames.png"
                        alt="TheWildJames"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">
                      Owner & GKI Developer
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      The Wild James - Owner of Wild Kernels and GKI Developer.
                    </p>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link href="https://github.com/TheWildJames" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link href="https://t.me/TheWildJames" target="_blank" rel="noopener noreferrer">
                          <Send className="h-4 w-4" />
                          Telegram DM
                        </Link>
                      </Button>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            </div>
          </section>
        </BlurFade>

        <BlurFade delay={0.3}>
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-6">
              Developers
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {developers.map((dev, index) => (
                <BlurFade key={dev.name} delay={0.4 + index * 0.1}>
                  <MagicCard
                    className="p-6 h-full"
                    gradientColor="rgba(34, 197, 94, 0.15)"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-green-500/30">
                        <Image
                          src={dev.avatar}
                          alt={dev.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">
                        {dev.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {dev.role}
                      </p>
                      <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link href={dev.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </section>
        </BlurFade>
      </div>
    </main>
  )
}
