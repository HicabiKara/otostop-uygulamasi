import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.logoContainer}>
            <Image
              className={styles.image}
              src="/logo.png"
              width={50}
              height={50}
              alt="logo"
            />
            <div className={styles.logoName}>
              Yol <span >Arkadaşı</span>
            </div>
          </div>
          
          <div className={styles.navItem}>
            <h1 className={styles.itemTitle}>Hesabım</h1>
            <div>
              <Link href="/signin" className={styles.navItemLink}>
                Giriş
              </Link>
            </div>
            <div>
              <Link href="/register" className={styles.navItemLink}>
                Hesap Oluştur
              </Link>
            </div>
          </div>
          <div className={styles.navItem}>
            <h1 className={styles.itemTitle}>Hakkımızda</h1>
            <div>
              <Link href="/howitworks" className={styles.navItemLink}>
                Yol Arkadaşı nasıl çalışır?
              </Link>
            </div>
            <div>
              <Link href="/aboutus" className={styles.navItemLink}>
                Hakkımızda
              </Link>
            </div>
          </div>
          <div className={styles.navItem}>
            <h1 className={styles.itemTitle}>Bizi Takip Edin</h1>
            <div className={styles.navItemLinks}>
              <div className={styles.navItemSocial}>
                <Link
                  href="https://github.com/HicabiKara"
                  className={styles.navItemSocialLink}
                >
                  <FaGithub />
                </Link>
              </div>
              <div className={styles.navItemSocial}>
                <Link
                  href="https://www.linkedin.com/in/hicabi-kara-2093b9213/"
                  className={styles.navItemSocialLink}
                >
                  <BsLinkedin />
                </Link>
              </div>
              <div className={styles.navItemSocial}>
                <Link
                  href="https://www.facebook.com/profile.php?id=100010737763005"
                  className={styles.navItemSocialLink}
                >
                  <FaFacebook />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className={styles.copy}>
        &copy; {new Date().getFullYear()} YolArkadaşı. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
