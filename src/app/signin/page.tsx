import React from "react";
import styles from "./signin.module.css";
import SignInForm from "@/components/signinform/SignInForm";
import Image from "next/image";

const SignIn = () => {
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
      <SignInForm />
    </main>
  );
};

export default SignIn;
