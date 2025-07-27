import React from "react";
import SignUpForm from "@/components/forms/signupform/SignUpForm";
import styles from "./register.module.css";
import Image from "next/image";
import { Metadata } from "next";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { redirect } from "next/navigation"
export const metadata: Metadata = {
  title: "Üye Ol",
  description: "Register page for new users",
}

const Register = async () => {
  const session = await getServerAuthSession()

  if (session) {
    redirect("/")
  }
  return (
    <main className={styles.container}>
      <Image
        src="/background-img.png"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        className={styles.backgroundImage}
      />
      <SignUpForm />
    </main>
  );
};

export default Register;
