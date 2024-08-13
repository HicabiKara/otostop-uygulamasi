import React from "react";
import styles from "./hero.module.css";
import Image from "next/image";
import Link from "next/link";
1
const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.leftBar}>
        <div className={styles.leftContent}>
          <h1>Düşük Ücretler İle Kesintisiz Seyehat Edin</h1>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/signin" className={styles.link}>
            Hemen Başla
          </Link>
        </div>
      </div>
      <div className={styles.rightBar}>
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
