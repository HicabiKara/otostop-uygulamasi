import React from "react";
import SignUpForm from "@/components/signupform/SignUpForm";
import styles from "./register.module.css";
import Image from "next/image";

const Register = () => {
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
