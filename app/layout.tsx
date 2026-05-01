import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans, DM_Mono } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-d',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-b',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-m',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rayhan Ahmed — Full Stack Developer',
  description:
    'Full Stack Developer specializing in MERN stack, PostgreSQL, and modern DevOps. Based in Dhaka, Bangladesh.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSans.variable} ${dmMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
