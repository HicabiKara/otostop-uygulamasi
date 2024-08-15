"use client"
import React from "react";
import styles from "./hero.module.css";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Hero = () => {
  useGSAP(()=>{
   gsap.to("#heroTitle",{opacity:1,y:"-50",delay:0.3}) 
   gsap.to("#startLink",{opacity:1,y:"-40",delay:0.4})
  gsap.to("#rightContent",{opacity:1,x:"0",delay:0.3})
  })

  return (
    <section className={styles.container}>
      <div className={styles.leftBar}>
        <div id="heroTitle"
         className={styles.leftContent}>
          <h1>Düşük Ücretler İle Kesintisiz Seyehat Edin</h1>
        </div>
        <div id="startLink" className={styles.linkContainer}>
          <Link href="/signin" className={styles.link}>
            Hemen Başla
          </Link>
        </div>
      </div>
      <div id="rightContent" className={styles.rightBar}>
        <Image
          className={styles.image}
          src="/hero.jpg"
          width={700}
          height={550}
          alt="hero-section-image"
        />
      </div>
    </section>
  );
};

export default Hero;
