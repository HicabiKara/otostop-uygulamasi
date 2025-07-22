"use client"
import React, { useState } from "react"
import styles from "./signupform.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { registerUser } from "@/lib/api"

const SignUpForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birthDate: '',
    gender: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await registerUser(formData)
      router.push("/signin")
    } catch (err: any) {
      setError(err.message || "Kayıt sırasında bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.title}>
        <h1>Üye Ol</h1>
      </div>

      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <input name="email" type="email" value={formData.email} onChange={handleChange} id="email" required placeholder=" " />
          <label htmlFor="email">E-posta</label>
        </div>

        <div className={styles.item}>
          <input name="password" type="password" value={formData.password} onChange={handleChange} id="password" required placeholder=" " />
          <label htmlFor="password">Şifre</label>
        </div>

        <div className={styles.item}>
          <input name="name" type="text" value={formData.name} onChange={handleChange} id="name" required placeholder=" " />
          <label htmlFor="name">İsim</label>
        </div>

        <div className={styles.item}>
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            id="birthDate"
            required
            placeholder=" "
            max={new Date().toISOString().split("T")[0]}
          />
          <label htmlFor="birthDate">Doğum Tarihi</label>
        </div>
        <div className={` ${styles.genderItem}`}>
          <label className={styles.genderLabel}>Cinsiyet</label>
          <div className={styles.genderOptions}>
            <label className={styles.genderOption}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                required
              />
              <span>Erkek</span>
            </label>
            <label className={styles.genderOption}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                required
              />
              <span>Kadın</span>
            </label>
          </div>
        </div>
      </div>

      {error && <p className={styles.p}>{error}</p>}

      <div className={styles.actionContainer}>
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? <span>Kayıt Olunuyor...</span> : <span>Üye Ol</span>}
        </button>
        <div className={styles.linkContainer}>
          Zaten bir hesabınız var mı?{" "}
          <Link href="/signin" className={styles.link}>Giriş Yap</Link>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
