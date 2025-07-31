"use client"

import React, { useState, useRef } from "react"
import styles from "./profile-image-uploader.module.css"
import { uploadAndUpdateProfileImage } from "@/lib/api"
import Image from "next/image"
import LoadingSpinner from "../loading/LoadingSpinner"

interface ProfileImageUploaderProps {
  currentImage?: string | null
  onUploadSuccess: (imageUrl: string) => void
}

export default function ProfileImageUploader({
  currentImage,
  onUploadSuccess,
}: ProfileImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    setUploading(true)
    setError("")

    try {
      const imageUrl = await uploadAndUpdateProfileImage(file)
      onUploadSuccess(imageUrl)
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className={styles.uploaderContainer}>
      <div className={styles.currentImageWrapper}>
        <Image
          src={currentImage || "/default-avatar.png"}
          alt="Profil Resmi"
          width={100}
          height={100}
          className={styles.currentImage}
        />
      </div>

      <label className={styles.uploadLabel} htmlFor="profile-image-input">
        {uploading ? <LoadingSpinner size="small" message="Resim Yükleniyor..."/> : "Profil Resmini Değiştir"}
      </label>

      <input
        type="file"
        id="profile-image-input"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        ref={inputRef}
        className={styles.hiddenInput}
      />

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}
