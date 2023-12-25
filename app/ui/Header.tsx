"use client";

import Image from "next/image";
import Link from "next/link";
import { TUser } from "../lib/auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import IconProfile from "./Icons/IconProfile";

export default function Header() {
  const [loginText, setLoginText] = useState("");
  const [url, setUrl] = useState("");

  const { status, data } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const user = data.user as TUser;
      setLoginText(user.profile);
      setUrl("/profile");
    } else {
      setLoginText("Login / Criar");
      setUrl("/login");
    }
  }, [data, status]);

  return (
    <div className="center border-b border-b-gray-200">
      <div className="container flex items-center justify-between gap-2">
        <Link href="/" title="cats">
          <Image
            src="/logocats.png"
            alt="cat logo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-20"
          />
        </Link>

        <Link href={url} className="flex items-center gap-3 text-indigo-800">
          {loginText}

          <IconProfile />
        </Link>
      </div>
    </div>
  );
}
