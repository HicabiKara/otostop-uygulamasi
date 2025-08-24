import React from "react";
import styles from "./signin.module.css";
import SignInForm from "@/components/forms/signinform/SignInForm";
import Image from "next/image";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import {redirect} from "next/navigation"
export const metadata ={
  title:"Giriş Yap",
  description:"Sign in page for existing users",
  
}

const SignIn = async () => {
  const session= await getServerAuthSession()
  
    if(session){
      redirect("/")
    }
  return (
    <main className={styles.container}>
      <Image
        src="/background-img.png"
        alt="Background Image"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        quality={100}
        className={styles.backgroundImage}
      />
      <SignInForm />
    </main>
  );
};

export default SignIn;
