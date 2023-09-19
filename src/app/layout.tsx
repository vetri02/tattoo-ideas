// Importing necessary CSS and types
import './globals.css'
import type { Metadata } from 'next'

// Importing necessary components and fonts
import { Proza_Libre } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from "@/components/theme-provider"




// Setting up the font
const font = Proza_Libre({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

// Setting up the metadata
export const metadata: Metadata = {
  title: 'Tattoo Ideas',
  description: 'Introducing Tattoo Ideas: the AI-powered tattoo design app. Transform your vision into unique ink designs with cutting-edge technology. Browse, customize, and find the perfect tattoo that\'s as individual as you. Experience the future of tattoo creativity today.',
}

// Defining the RootLayout function
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Returning the HTML structure
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
