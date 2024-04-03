"use client";

import { usePathname } from "next/navigation";
import { spectral } from "../../fonts";

const TITLES = {
  "/profile": "Minhas Fotos",
  "/profile/post": "Postar Foto",
  "/profile/stats": "Estatísticas",
  "/profile/info": "Informações",
  "/profile/friends": "Amigos",
};

export default function Title() {
  const pathname = usePathname();

  return (
    <h1
      className={`${spectral.className} subtitle break-all text-4xl xs:text-5xl`}
    >
      {TITLES[pathname as keyof typeof TITLES]}
    </h1>
  );
}
