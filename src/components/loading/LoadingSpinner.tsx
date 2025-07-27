import React from "react"
import styles from "./LoadingSpinner.module.css"

type LoadingSpinnerProps = {
  size?: "small" | "medium" | "large"
  message?: string
  overlay?: boolean
}

const LoadingSpinner = ({ size = "medium", message, overlay = false }: LoadingSpinnerProps) => {
  return (
    <div className={`${overlay ? styles.overlay : ""}`}>
      <div className={styles.centeredContent}>
        <div className={`${styles.spinner} ${styles[size]}`} />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  )
}
export default LoadingSpinner