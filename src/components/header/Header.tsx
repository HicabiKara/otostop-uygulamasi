"use client";
import Image from "next/image";
import React from "react";
import Styles from "@/components/header/header.module.css";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useState } from "react";

const Header = () => {
  const [toggleIcon, setToggleIcon] = useState(true);

  const handleClick = () => {
    setToggleIcon(!toggleIcon);
  };
  return (
    <nav className={Styles.container}>
      <Link href="/" className={Styles.link}>
        <div className={Styles.logoContainer}>
          <Image
            className={Styles.image}
            src="/logo.png"
            width={50}
            height={50}
            alt="logo"
          />
          <div className={Styles.logoName}>
            Yol <span>Arkadaşı</span>
          </div>
        </div>
      </Link>
      <div className={Styles.searchContainer}>
        <input className={Styles.searchInput} placeholder="İlan ara..." />
        <LuSearch className={Styles.searchIcon} />
      </div>
      
      <div className={Styles.navLinks}>
        <div className={Styles.navItem}>
          <Link href="/offer-trip" className={Styles.link}>
            Yolculuk Yayınla
          </Link>
        </div>
        <div className={Styles.navItem}>
          <Link href="/active-ads" className={Styles.link}>
            Aktif İlanlar
          </Link>
        </div>
        <div className={Styles.navItem}>
          <Link href="/signin" className={Styles.link}>
            Giriş Yap
          </Link>
        </div>
        <div className={Styles.navItem}>
          <Link href="/register" className={Styles.link}>
            Üye Ol
          </Link>
        </div>
      </div>
      {toggleIcon ? (
        <button onClick={handleClick} className={Styles.navItem}>
          <MdClose className={Styles.hamburgerIcon} />
        </button>
      ) : (
        <button onClick={handleClick} className={Styles.navItem}>
          <GiHamburgerMenu className={Styles.hamburgerIcon} />
        </button>
      )}
      {toggleIcon && (
        <div className={Styles.hamburgerLinks}>
          <div className={Styles.navItem}>
            <Link href="/offer-trip" className={Styles.link}>
              Yolculuk Yayınla
            </Link>
          </div>
          <div className={Styles.navItem}>
            <Link href="/active-ads" className={Styles.link}>
              Aktif İlanlar
            </Link>
          </div>
          <div className={Styles.navItem}>
            <Link href="/signin" className={Styles.link}>
              Giriş Yap
            </Link>
          </div>
          <div className={Styles.navItem}>
            <Link href="/register" className={Styles.link}>
              Üye Ol
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
