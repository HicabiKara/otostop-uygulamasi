"use client";
import React, { useRef } from "react";
import styles from "./features.module.css";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const column1Ref = useRef(null);
  const column2Ref = useRef(null);

  useGSAP(() => {
    gsap.to(column1Ref.current, {
      scrollTrigger: {
        trigger: column1Ref.current,
        start: "top 90%",
      },
      opacity: 1,
      y: 0,
      delay: 0.3,
      duration: 1,
    });

    gsap.to(column2Ref.current, {
      scrollTrigger: {
        trigger: column2Ref.current,
        start: "top 90%",
      },
      opacity: 1,
      y: 0,
      delay: 0.6,
      duration: 1,
    });
  }, []);

  return (
    <section className={styles.container}>
      <div ref={column1Ref} className={styles.column}>
        <h1>Yolculuğa mı çıkmak istiyorsunuz?</h1>

        <FeatureContent
          img="/feature-img1.jpg"
          title="Üye olun ve giriş yapın."
          desc="İlk olarak üyelik işlemlerinizi gerçekleştirin. Ardından giriş yaparak ilk adımı tamamlayın."
        />
        <FeatureContent
          img="/feature-img2.jpg"
          title="Kendinize uygun ilanı bulun ve rezervasyon isteği gönderin."
          desc="Aktif ilanlar sayfasından kendinize uygun yolculuk ilanını bulun. Ardından bu ilana rezervasyon talebinde bulunun."
        />
        <FeatureContent
          img="/feature-img3.jpg"
          title="Yolculuğun tadını çıkarın."
          desc="İlan sahibi talebinizi onayladıktan sonra ilgili ilan tarihi ve saatinde yolculuğunuza başlayabilirsiniz. İyi yolculuklar."
        />
      </div>

      <div ref={column2Ref} className={styles.column}>
        <h1>Yol arkadaşı mı arıyorsunuz?</h1>
        <FeatureContent
          img="/feature-img1.jpg"
          title="Üye olun ve giriş yapın"
          desc="İlk olarak üyelik işlemlerinizi gerçekleştirin. Ardından giriş yaparak ilk adımı tamamlayın."
        />
        <FeatureContent
          img="/feature-img2.jpg"
          title="Yolculuk ilanınızı hızlı ve kolay bir şekilde oluşturun."
          desc="Yolculuk yayınla alanından kendinize uygun ilanı oluşturarak ilanınızı yayınlayın."
        />
        <FeatureContent
          img="/feature-img3.jpg"
          title="Yolculuğun tadını çıkarın."
          desc="İlanınıza gelen talepleri inceleyerek uygun talebi onaylayın. Yolcularla buluşup yolculuğunuza başlayın. İyi yolculuklar."
        />
      </div>
    </section>
  );
};

export default Features;

const FeatureContent = ({
  img,
  title,
  desc,
}: {
  img: string;
  title: string;
  desc: string;
}) => (
  <div className={styles.content}>
    <div className={styles.imageContainer}>
      <Image src={img} width={250} height={250} alt="feature-img" />
    </div>
    <div className={styles.contentContainer}>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  </div>
);