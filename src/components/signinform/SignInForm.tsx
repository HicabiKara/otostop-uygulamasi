"use client"
import React, { useState } from "react";
import styles from "./signinform.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.title}>
        <h1>Giriş Yap</h1>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label htmlFor="username">E-posta</label>
        </div>
        <div className={styles.item}>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label htmlFor="password">Şifre</label>
        </div>
      </div>
      {error && <p className={styles.p}>{error}</p>}
      <div className={styles.actionContainer}>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Giriş Yapılıyor..." : <span>Giriş Yap</span>}
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