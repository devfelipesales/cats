"use client";

import Link from "next/link";
import IconGrid from "../Icons/IconGrid";
import IconPlus from "../Icons/IconPlus";
import IconChart from "../Icons/IconChart";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import styles from "./NavProfile.module.css";

import IconProfileInfo from "../Icons/IconProfileInfo";
import React from "react";

export default function NavProfile() {
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const navRef = React.useRef(null);
  const buttonMobileRef = React.useRef(null);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  function handleOutsideClick(event: MouseEvent) {
    if (
      event.target !== navRef.current &&
      event.target !== buttonMobileRef.current
    ) {
      setMobileMenu(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonMobileRef}
        className={`${styles.mobileButton} ${
          mobileMenu && styles.mobileButtonActive
        }`}
        aria-label="Menu"
        onClick={() => setMobileMenu(!mobileMenu)}
      />
      <nav
        ref={navRef}
        className={`${styles.nav} ${mobileMenu && styles.navMobileActive}`}
      >
        <Link
          href="/profile"
          className={pathname === "/profile" ? styles.active : ""}
        >
          <IconGrid />
          <p className="sm:hidden">Minhas Fotos</p>
        </Link>
        <Link
          href="/profile/post"
          className={pathname === "/profile/post" ? styles.active : ""}
        >
          <IconPlus />
          <p className="sm:hidden">Postar Foto</p>
        </Link>
        <Link
          href="/profile/stats"
          className={pathname === "/profile/stats" ? styles.active : ""}
        >
          <IconChart />
          <p className="sm:hidden">Estatísticas</p>
        </Link>
        <Link
          href="/profile/info"
          className={pathname === "/profile/info" ? styles.active : ""}
        >
          <IconProfileInfo />
          <p className="sm:hidden">Informações</p>
        </Link>

        <SignOutButton />
      </nav>
    </>
  );
}
