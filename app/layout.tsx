import type { Metadata } from "next"
import { Geist, JetBrains_Mono, Merriweather } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { baseUrl } from "@/lib/url"

const merriweatherHeading = Merriweather({subsets:['latin'],variable:'--font-heading'});

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'})

export const metadata: Metadata = {
  /**
   * Resolves relative URLs — canonical alternates and Open Graph images — so
   * they can never fall back to localhost in a production build. Points at the
   * apex marketing origin; lib/seo.ts builds canonicals against it too.
   */
  metadataBase: new URL(baseUrl()),
  /**
   * Pages supply a bare name ("About") and inherit the suffix. The default
   * covers routes that set no title of their own: /portal/login and /r/[slug].
   */
  title: {
    default: "Onloz — Turn customer feedback into reviews",
    template: "%s | Onloz",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, "font-mono", jetbrainsMono.variable, merriweatherHeading.variable)}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
