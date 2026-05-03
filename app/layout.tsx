import type { Metadata } from 'next'
import { Geist, Geist_Mono, Audiowide } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { DeviceProvider } from '@/components/device-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _audiowide = Audiowide({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: 'WildKernels',
  description: 'WildKernels - Innovation at the core',
  generator: 'v0.app',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem enableColorScheme={false}>
          <DeviceProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </DeviceProvider>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
