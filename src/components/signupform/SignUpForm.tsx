import React from "react";
import styles from "./signupform.module.css";

const SignUpForm = () => {
  return (
    <form className={styles.container}>
      <div className={styles.title}>
        <h1>Üye Ol</h1>
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

        <div className={styles.item}>
          <input type="text" id="email" required placeholder=" " />
          <label htmlFor="email">Ad Soyad</label>
        </div>
        <div className={styles.item}>
          <input min={0} type="number" id="email" required placeholder=" " />
          <label htmlFor="email">Yaş</label>
        </div>
      </div>
      <button className={styles.button}>
        <span>Üye Ol</span>
      </button>
    </form>
  );
};

export default SignUpForm;
