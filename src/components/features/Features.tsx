"use client"
import React from "react";
import styles from "./features.module.css";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Features = () => {
  useGSAP(()=>{
    gsap.to("#content",{
      scrollTrigger:{
        trigger:"#content",
        start:"top 90%"
      },
      opacity:1,
      y:"0",
      delay:1.5,
      duration:1
    })
  })
  return (
    <section className={styles.container}>
      <div id="content" className={styles.column}>
        <h1>Yolculuğa mı çıkmak istiyorsunuz?</h1>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/feature-img1.jpg"
              width={250}
              height={250}
              alt="feature-img"
            />
          </div>
          <div className={styles.contentContainer}>
            <h2>Üye olun ve giriş yapın.</h2>
            <p>
              İlk olarak üyelik işlemlerinizi gerçekleştirin.Ardından giriş
              yaparak ilk adımı tamamlayın
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/feature-img2.jpg"
              width={250}
              height={250}
              alt="feature-img"
            />
          </div>
          <div className={styles.contentContainer}>
            <h2>Kendinize uygun ilanı bulun ve rezervasyon isteği gönderin.</h2>
            <p>
            Aktif ilanlar sayfasından kendinize uygun yolculuk ilanını bulun.Ardından bu ilana rezervasyon talebinde bulunun.
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/feature-img3.jpg"
              width={250}
              height={250}
              alt="feature-img"
            />
          </div>
          <div className={styles.contentContainer}>
            <h2>Yolculuğun tadını çıkarın.</h2>
            <p>
              İlan sahibi talebinizi onayladıktan sonra iglili ilan tarihi ve saatinde yolculuğunuza başlayabilirsiniz.İyi yolculuklar
            </p>
          </div>
        </div>
      </div>

      <div id="content" className={styles.column}>
        <h1>Yol arkadaşı mı arıyorsunuz?</h1>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/feature-img1.jpg"
              width={250}
              height={250}
              alt="feature-img"
            />
          </div>
          <div className={styles.contentContainer}>
            <h2>Üye olun ve giriş yapın</h2>
            <p>
              İlk olarak üyelik işlemlerinizi gerçekleştirin.Ardından giriş
              yaparak ilk adımı tamamlayın
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/feature-img2.jpg"
              width={250}
              height={250}
              alt="feature-img"
            />
          </div>
          <div className={styles.contentContainer}>
            <h2>Yolculuk ilanınızı hızlı ve kolay bir şekilde oluşturun.</h2>
            <p>
                Yolculuk yayınla alanından kendinize uygun ilanı oluşturarak ilanınızı yayınlayın.
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/feature-img3.jpg"
              width={250}
              height={250}
              alt="feature-img"
            />
          </div>
          <div className={styles.contentContainer}>
            <h2>Yolculuğun tadını çıkarın.</h2>
            <p>
            İlgili ilanınız için gelen yolculuk taleplerini inceleyerk uygun talebi veya talepleri onaylayın.Yolcularınızla buluşup yolculuğunuza başlayabilirsiniz.İyi yolculuklar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
