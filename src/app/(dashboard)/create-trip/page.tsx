"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import CreateTripForm from "@/components/forms/createTripForm/CreateTripForm"
import LoadingSpinner from "@/components/loading/LoadingSpinner"

export default function CreateTripPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/?loginRequired=true")
    }
  }, [status, router])

  if (status === "loading") {
    return <LoadingSpinner message="Kontrol ediliyor..." />
  }

  if (status === "unauthenticated") {
    return null 
  }

  return <CreateTripForm />
}
