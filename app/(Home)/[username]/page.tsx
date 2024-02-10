"use client";

import { TUser, fetchIdByProfile } from "@/app/lib/fetchData";
import Feed from "@/app/ui/feed/Feed";
import { spectral } from "@/app/ui/fonts";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    async function fetchData() {
      const user = await fetchIdByProfile(params.username);

      if (!user?.id) {
        notFound();
      }
      setUser(user);
    }
    fetchData();
  }, [params.username]);

  return (
    <div className="container">
      <h1
        className={`${spectral.className} subtitle mb-10 break-all text-4xl xs:text-5xl`}
      >
        {user?.name}
      </h1>

      <Feed userId={user?.id} />
    </div>
  );
}
