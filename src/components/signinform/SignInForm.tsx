import React from "react";
import styles from "./signinform.module.css";
import Link from "next/link";

const SignInForm = () => {
  return (
    <form className={styles.container}>
      <div className={styles.title}>
        <h1>Giriş Yap</h1>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <input type="text" id="username" required placeholder=" " />
          <label htmlFor="username">E-posta</label>
        </div>
        <div className={styles.item}>
          <input type="password" id="password" required placeholder=" " />
          <label htmlFor="password">Şifre</label>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <button className={styles.button}>
          <span>Giriş Yap</span>
        </button>
        <div className={styles.linkContainer}>
          Bir hesabınız yok mu?{" "}
          <Link href="/register" className={styles.link}>
            Üye Ol
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
