import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { redirect } from "next/navigation";
import { logoutUser } from "@/lib/logout";
import calculateAge from "@/lib/calculateUserAge";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/signin");
  }

  const user = session.user;
  const age = user?.birthDate ? calculateAge(user.birthDate) : null;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Profil Sayfanız</h1>
      <div className={styles.card}>
        <Image
          className={styles.avatar}
          src={
            user?.gender === "male"
              ? "/male-avatar.png"
              : "/female-avatar.png"
          }
          width={100}
          height={100}
          alt="Profil Resmi"
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
                {new Date(user.birthDate).toLocaleDateString("tr-TR")}{" "}
                {age !== null && `(${age} yaşında)`}
              </span>
            </p>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.editBtn}>Profili Düzenle</button>
        <button className={styles.logoutBtn} onClick={logoutUser}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}