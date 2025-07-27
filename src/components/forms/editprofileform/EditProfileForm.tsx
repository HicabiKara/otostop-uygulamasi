"use client"
import React, { useState } from "react"
import styles from "./editprofileform.module.css"
import LoadingSpinner from "@/components/loading/LoadingSpinner"
interface Props {
  currentData: {
    email: string
    name: string
    birthDate: string}
  onUpdate: (data: { email: string; name: string; birthDate: string }) => void
  onChangePassword: () => void
  errorMessage?: string
  loading?: boolean
}

const EditProfileForm: React.FC<Props> = ({
  currentData,
  onUpdate,
  onChangePassword,
  errorMessage,
  loading,
}) => {
  const [formData, setFormData] = useState(currentData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.title}>
        <h1>Profili Güncelle</h1>
      </div>

      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder=" " />
          <label htmlFor="email">E-posta</label>
        </div>

        <div className={styles.item}>
          <input name="name" type="text" value={formData.name} onChange={handleChange} required placeholder=" " />
          <label htmlFor="name">Ad-Soyad</label>
        </div>

        <div className={styles.item}>
          <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required placeholder=" " />
          <label htmlFor="birthDate">Doğum Tarihi</label>
        </div>

        <div className={styles.item}>
          <input type="password" value="********" disabled placeholder=" " />
          <label>Şifre</label>
          <span className={styles.passwordLink} onClick={onChangePassword}>Şifreyi Değiştir</span>
        </div>
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      

      <div className={styles.actionContainer}>
        <button className={styles.button} type="submit" disabled={loading}>
          <span>{loading ? <LoadingSpinner size="small" message="Güncelleniyor..."/> : "Güncelle"}</span>
        </button>
      </div>
    </form>
  )
}

export default EditProfileForm