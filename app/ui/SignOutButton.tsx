"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import IconSignOut from "./Icons/IconSignOut";

export default function SignOutButton() {
  const router = useRouter();

  async function HandleSignOut(event: React.MouseEvent<HTMLElement>) {
    const res = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(res.url);
  }

  return (
    <button
      onClick={HandleSignOut}
      className="border border-indigo-500 px-4 py-2"
      title="Sair"
    >
      <IconSignOut />
    </button>
  );
}
