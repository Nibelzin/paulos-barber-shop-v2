import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Header from "../_components/Header"
import Footer from "../_components/Footer"
import AuthProvider from "../_providers/auth"
import { Toaster } from "../_components/ui/toaster"
import { ThemeProvider } from "../_components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Paulo's Barber Shop",
  description: "Melhor experiência em cortes.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-full flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Toaster />
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
