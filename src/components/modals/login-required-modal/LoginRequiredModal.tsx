"use client";

import React from "react";
import styles from "./LoginRequiredModal.module.css";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/features/hook";
import { closeModal } from "@/features/ui/uiSlice";

const LoginRequiredModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRedirect = () => {
    dispatch(closeModal());
    router.push("/signin");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Giriş Yapmanız Gerekiyor</h2>
      <p className={styles.message}>
        Bu işlemi gerçekleştirmek için lütfen hesabınıza giriş yapınız.
      </p>
      <div className={styles.buttonGroup}>
        <button className={styles.loginButton} onClick={handleRedirect}>
          Giriş Yap
        </button>
        <button className={styles.cancelButton} onClick={() => dispatch(closeModal())}>
          Vazgeç
        </button>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
