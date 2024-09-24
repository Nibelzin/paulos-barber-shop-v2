import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Paulo's Barber Shop - Login",
  description: "Melhor experiência em cortes.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full flex-col">{children}</div>
      </body>
    </html>
  )
}
