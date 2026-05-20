import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'
import { PortfolioChatbot } from '@/components/portfolio-chatbot'
import { PortfolioAnalytics } from '@/components/portfolio-analytics'
import './globals.css'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const faviconPath = `${basePath}/favicon.png`

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
  title: 'Aurelie Perichon | Portfolio',
  description: 'Etudiante en MSc AI Applied to Business - Passionnee par l\'analyse de donnees au service de la strategie et de l\'innovation',
  keywords: ['data science', 'AI', 'machine learning', 'portfolio', 'python', 'web development'],
  authors: [{ name: 'Aurelie Perichon' }],
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
    apple: faviconPath,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <PortfolioAnalytics />
          <PortfolioChatbot />
        </LanguageProvider>
      </body>
    </html>
  )
}
