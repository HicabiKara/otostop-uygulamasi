"use client"

import Link from "next/link"
import styles from "./not-found.module.css"

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Aradığınız sayfa bulunamadı.</p>
      <Link href="/" className={styles.homeLink}>Ana Sayfaya Dön</Link>
    </div>
  )
}