"use client"

import React, { useEffect } from "react"
import styles from "./modal.module.css"


type modalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
}


export default function Modal({ isOpen, onClose, children }: modalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
            document.addEventListener("keydown", handleEsc)
        }
        return () => document.removeEventListener("keydown", handleEsc)
    }, [onClose])

    if (!isOpen) return null
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}

