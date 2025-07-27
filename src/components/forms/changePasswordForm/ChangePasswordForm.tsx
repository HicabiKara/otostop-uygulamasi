"use client"
import React, { useState } from "react"
import styles from "./changepasswordform.module.css"
import LoadingSpinner from "@/components/loading/LoadingSpinner"

interface Props {
  onCancel: () => void
  onSubmit: (data: { currentPassword: string; newPassword: string; confirmNewPassword: string }) => void
  errorMessage: string
  loading?: boolean
}

const ChangePasswordForm: React.FC<Props> = ({ onCancel, onSubmit, errorMessage, loading }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmNewPassword) {
      return alert("Yeni şifreler birbiriyle uyuşmuyor.")
    }

    onSubmit(formData)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Şifreyi Güncelle</h2>

      <div className={styles.item}>
        <input name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} required placeholder=" " />
        <label htmlFor="currentPassword">Mevcut Şifre</label>
      </div>

      <div className={styles.item}>
        <input name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} required placeholder=" " />
        <label htmlFor="newPassword">Yeni Şifre</label>
      </div>

      <div className={styles.item}>
        <input name="confirmNewPassword" type="password" value={formData.confirmNewPassword} onChange={handleChange} required placeholder=" " />
        <label htmlFor="confirmNewPassword">Yeni Şifre (Tekrar)</label>
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <div className={styles.actions}>
        {loading ? <LoadingSpinner overlay message="Güncelleniyor..." /> :
          <> <button type="submit" className={styles.updateBtn}><span>Güncelle</span></button>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}><span>İptal</span></button>
          </>
        }

      </div>
    </form>
  )
}

export default ChangePasswordForm