"use client"
import { useSession } from "next-auth/react"
import LoadingSpinner from "@/components/loading/LoadingSpinner";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

   const { status } = useSession()

  if (status === "loading") {
    return <LoadingSpinner overlay message="Yükleniyor..." />
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
