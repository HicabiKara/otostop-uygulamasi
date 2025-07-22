import React from "react";
import styles from "./aboutus.module.css";

const Hakkımızda = () => {
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <h1 className={styles.title}>Hakkımızda</h1>
        <p className={styles.text}>
          Yol Arkadaşı, kullanıcıların güvenli ve ekonomik yolculuklar
          gerçekleştirmesini hedefleyen yenilikçi bir platformdur. Sürücüler ve
          yolcuları buluşturarak hem çevre dostu ulaşımı destekler hem de
          topluluklar arasında bağ kurar.
        </p>
        <p className={styles.text}>
          Amacımız, yolculukları paylaşarak maliyetleri azaltmak, güvenli
          bir ulaşım ağı kurmak ve kullanıcı deneyimini en üst seviyeye
          taşımaktır. Ekibimiz, kullanıcı odaklı yaklaşımı ve teknolojik altyapısı
          ile size en iyi hizmeti sunmayı hedefler.
        </p>
      </section>
    </main>
  );
};

export default Hakkımızda;