"use client"

import React, { useEffect } from "react"
import styles from "./modal.module.css"
import { useAppDispatch, useAppSelector } from "@/features/hook"
import { closeModal} from "@/features/ui/uiSlice"


type ModalProps = {
    name:"update-profile" | "change-password" | "login-required" 
    children: React.ReactNode,
}


export default function Modal({ name, children }: ModalProps) {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.ui.activeModal === name)

    useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeModal())
      document.addEventListener("keydown", handleEsc)
      return () => document.removeEventListener("keydown", handleEsc)
    }
  }, [dispatch])

    if (!isOpen) return null
    return (
        <div className={styles.overlay} onClick={() => dispatch(closeModal())}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={() => dispatch(closeModal())}>
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}

