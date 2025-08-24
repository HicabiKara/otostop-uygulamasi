"use client"

import React, { useState, useEffect } from "react"
import styles from "./page.module.css"
import Modal from "@/components/ui/modal/Modal"
import EditProfileForm from "@/components/forms/editprofileform/EditProfileForm"
import ChangePasswordForm from "@/components/forms/changePasswordForm/ChangePasswordForm"
import { logoutUser } from "@/lib/logout"
import calculateAge from "@/lib/calculateUserAge"
import { useSession } from "next-auth/react"
import { updateProfile, changeUserPassword } from "@/lib/api"
import { redirect } from "next/navigation"
import ProfileImageUploader from "@/components/profile-image-uploader/ProfileImageUploader"
import { openModal,closeModal } from "@/features/ui/uiSlice"
import { useAppDispatch} from "@/features/hook"
import IncomingTripRequestsList from "@/components/trips/trip-requests/incoming-trip-requests/IncomingTripRequestsList"
import MyTripRequestsList from "@/components/trips/trip-requests/mytrip-request-list/MyTripRequestsList"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const dispatch = useAppDispatch()
  
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const user = session?.user
  const age = user?.birthDate ? calculateAge(user.birthDate) : null

  // Yerel state ile profil resmi kontrolü, session güncellenince resetlenir
  const [profileImage, setProfileImage] = useState(
    user?.image
      ? user.image
      : user?.gender === "male"
      ? "/male-avatar.png"
      : "/female-avatar.png"
  )

  // Eğer session.user.image değişirse profileImage state'ini güncelle
  useEffect(() => {
    setProfileImage(
      user?.image
        ? user.image
        : user?.gender === "male"
        ? "/male-avatar.png"
        : "/female-avatar.png"
    )
  }, [user?.image, user?.gender])

  if (!session) redirect("/")

  const handleUpdate = async (formData: { email: string; name: string; birthDate: string }) => {
    setProfileLoading(true)
    setProfileError("")
    try {
      await updateProfile(formData)
      await update({ ...formData })
     
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
     
      logoutUser()
    } catch (error: any) {
      setPasswordError(error.message || "Şifre güncellenirken bir hata oluştu.")
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleImageUploadSuccess = async (imageUrl: string) => {
    setProfileImage(imageUrl)  // Anında görsel güncelle
    await update({ image: imageUrl })  // Session da güncellensin
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Profil Sayfanız</h1>

      <div className={styles.card}>
        <ProfileImageUploader
          currentImage={profileImage}
          onUploadSuccess={handleImageUploadSuccess}
        />

        <div className={styles.info}>
          <h2>{user?.name || "İsimsiz Kullanıcı"}</h2>
          <p>{user?.email || "Email tanımsız"}</p>
          {user?.gender && (
            <p>
              Cinsiyet:{" "}
              <span className={styles.detailValue}>
                {user.gender === "male" ? "Erkek" : "Kadın"}
              </span>
            </p>
          )}
          {user?.birthDate && (
            <p>
              Doğum Tarihi:{" "}
              <span className={styles.detailValue}>
                {new Date(user.birthDate).toLocaleDateString("tr-TR")} ({age} yaşında)
              </span>
            </p>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.editBtn} onClick={() => dispatch(openModal("update-profile"))}>
          Profili Düzenle
        </button>
        <button className={styles.logoutBtn} onClick={logoutUser}>
          Çıkış Yap
        </button>
      </div>
      <h2 className={styles.heading}>Yolculuk Durumları</h2>
      <div className={styles.card}>
        <IncomingTripRequestsList/>
      </div>
      <div className={styles.card}>
        <MyTripRequestsList/>
      </div>
      <Modal name="update-profile">
        <EditProfileForm
          currentData={{
            email: user?.email || "",
            name: user?.name || "",
            birthDate: user?.birthDate || "",
          }}
          onUpdate={handleUpdate}
          onChangePassword={() => dispatch(openModal("change-password"))}
          errorMessage={profileError}
          loading={profileLoading}
        />
      </Modal>

      <Modal name="change-password">
        <ChangePasswordForm
          onCancel={()=>dispatch(closeModal())}
          onSubmit={handlePasswordUpdate}
          errorMessage={passwordError}
          loading={passwordLoading}
        />
      </Modal>
    </div>
  )
}
