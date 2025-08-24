// components/CreateTripForm.tsx (güncellenmiş)
"use client"
import React, { useEffect, useState } from "react"
import styles from "./createtripform.module.css"
import { useRouter } from "next/navigation"
import { createTrip } from "@/lib/api"
import LoadingSpinner from "@/components/loading/LoadingSpinner"
import { useSession } from "next-auth/react"
import Cities from "@/lib/constants/Cities"

const CreateTripForm = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    price: "",
    availableSeats: "",
    description: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
    // loading durumunda bir şey gösterme seçeneği istersen ekleyebilirsin
  }, [status, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateBeforeSend = () => {
    setError("")

    const { origin, destination, departureDate, departureTime, price, availableSeats } = formData

    if (!origin || !destination || !departureDate || !departureTime || price === "" || availableSeats === "") {
      setError("Lütfen tüm zorunlu alanları doldurun.")
      return false
    }

    if (origin === destination) {
      setError("Kalkış ve varış aynı olamaz.")
      return false
    }

    // tarih ve saat kontrolü
    const dateParts = departureDate.split("-")
    const timeParts = departureTime.split(":")
    if (dateParts.length !== 3 || timeParts.length < 2) {
      setError("Geçersiz tarih veya saat formatı.")
      return false
    }
    const departure = new Date(
      parseInt(dateParts[0], 10),
      parseInt(dateParts[1], 10) - 1,
      parseInt(dateParts[2], 10),
      parseInt(timeParts[0], 10),
      parseInt(timeParts[1], 10)
    )
    if (isNaN(departure.getTime())) {
      setError("Geçersiz tarih veya saat.")
      return false
    }
    if (departure < new Date()) {
      setError("Geçmiş bir tarih seçilemez.")
      return false
    }

    const seats = parseInt(String(availableSeats), 10)
    if (!Number.isInteger(seats) || seats < 1) {
      setError("Boş koltuk sayısı 1 veya daha büyük olmalıdır.")
      return false
    }

    const p = Number(price)
    if (Number.isNaN(p) || p < 0) {
      setError("Geçersiz ücret değeri.")
      return false
    }

    // oturum kontrolü
    const driverId = (session as any)?.user?.id || (session as any)?.user?._id
    if (!driverId) {
      setError("Oturum doğrulanamadı. Lütfen yeniden giriş yapın.")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!validateBeforeSend()) return

    setLoading(true)

    try {
      const driverId = (session as any)?.user?.id || (session as any)?.user?._id
      const payload = {
        ...formData,
        driverId,
      }
      await createTrip(payload)
      router.push("/trips")
    } catch (err: any) {
      console.error("createTrip error:", err)
      setError(err?.message || "İlan oluşturulurken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  // oturum yükleniyorsa spinner
  if (status === "loading") return <div className={styles.center}><LoadingSpinner size="small" message="Kontrol ediliyor..." /></div>

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.title}>
        <h1>İlan Oluştur</h1>
      </div>

      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <select name="origin" value={formData.origin} onChange={handleChange} id="origin" required>
            <option value="" disabled>Kalkış Noktası Seçin</option>
            {Cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <label htmlFor="origin">Kalkış Noktası</label>
        </div>

        <div className={styles.item}>
          <select name="destination" value={formData.destination} onChange={handleChange} id="destination" required>
            <option value="" disabled>Varış Noktası Seçin</option>
            {Cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <label htmlFor="destination">Varış Noktası</label>
        </div>

        <div className={styles.item}>
          <input name="departureDate" type="date" required value={formData.departureDate} onChange={handleChange} id="departureDate" placeholder=" " />
          <label htmlFor="departureDate">Tarih</label>
        </div>

        <div className={styles.item}>
          <input name="departureTime" type="time" required value={formData.departureTime} onChange={handleChange} id="departureTime" placeholder=" " />
          <label htmlFor="departureTime">Kalkış Saati</label>
        </div>

        <div className={styles.item}>
          <input name="price" type="number" value={formData.price} onChange={handleChange} id="price" required placeholder=" " />
          <label htmlFor="price">Ücret (₺)</label>
        </div>

        <div className={styles.item}>
          <input name="availableSeats" type="number" value={formData.availableSeats} onChange={handleChange} id="availableSeats" required placeholder=" " />
          <label htmlFor="availableSeats">Boş Koltuk Sayısı</label>
        </div>

        <div className={styles.item}>
          <textarea name="description" value={formData.description} onChange={handleChange} id="description" placeholder=" " rows={4} />
          <label htmlFor="description">Açıklama(Opsiyonel)</label>
        </div>
      </div>

      {error && <p className={styles.p}>{error}</p>}

      <div className={styles.actionContainer}>
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size="small" message="İlan Oluşturuluyor..." /> : <span>İlanı Oluştur</span>}
        </button>
      </div>
    </form>
  )
}

export default CreateTripForm
