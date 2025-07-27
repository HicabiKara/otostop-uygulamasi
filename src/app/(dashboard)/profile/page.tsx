"use client"

import React, { useState } from "react"
import styles from "./page.module.css"
import Image from "next/image"
import Modal from "@/components/modal/Modal"
import EditProfileForm from "@/components/forms/editprofileform/EditProfileForm"
import ChangePasswordForm from "@/components/forms/changePasswordForm/ChangePasswordForm"
import { logoutUser } from "@/lib/logout"
import calculateAge from "@/lib/calculateUserAge"
import { useSession } from "next-auth/react"
import { updateProfile, changeUserPassword } from "@/lib/api"
import { redirect } from "next/navigation"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")



  const user = session?.user
  const age = user?.birthDate ? calculateAge(user.birthDate) : null

  if (!session) redirect("/")

  const handleUpdate = async (formData: { email: string; name: string; birthDate: string }) => {
    setProfileLoading(true)
    setProfileError("")
    try {
      await updateProfile(formData)
      await update({ ...formData })
      setIsProfileModalOpen(false)
    } catch (err: any) {
      setProfileError(err.message)
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePasswordUpdate = async (data: {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
  }) => {
    setPasswordLoading(true)
    setPasswordError("")
    try {
      await changeUserPassword(data)
      setIsPasswordModalOpen(false)
      logoutUser()
    } catch (error: any) {
      setPasswordError(error.message || "Şifre güncellenirken bir hata oluştu.")
    }
    finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Profil Sayfanız</h1>

      <div className={styles.card}>
        <Image
          className={styles.avatar}
          src={user?.gender === "male" ? "/male-avatar.png" : "/female-avatar.png"}
          width={100}
          height={100}
          alt="Profil Resmi"
        />
        <div className={styles.info}>
          <h2>{user?.name || "İsimsiz Kullanıcı"}</h2>
          <p>{user?.email || "Email tanımsız"}</p>
          {user?.gender && <p>Cinsiyet: <span className={styles.detailValue}>{user.gender === "male" ? "Erkek" : "Kadın"}</span></p>}
          {user?.birthDate && (
            <p>Doğum Tarihi: <span className={styles.detailValue}>{new Date(user.birthDate).toLocaleDateString("tr-TR")} ({age} yaşında)</span></p>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.editBtn} onClick={() => setIsProfileModalOpen(true)}>Profili Düzenle</button>
        <button className={styles.logoutBtn} onClick={logoutUser}>Çıkış Yap</button>
      </div>

      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <EditProfileForm
          currentData={{ email: user?.email || "", name: user?.name || "", birthDate: user?.birthDate || "" }}
          onUpdate={handleUpdate}
          onChangePassword={() => setIsPasswordModalOpen(true)}
          errorMessage={profileError}
          loading={profileLoading}
        />
      </Modal>

      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
        <ChangePasswordForm
          onCancel={() => setIsPasswordModalOpen(false)}
          onSubmit={handlePasswordUpdate}
          errorMessage={passwordError}
          loading={passwordLoading}
        />
      </Modal>
    </div>
  )
}
