import { getServerSession } from "next-auth";
import { TUser, authOptions } from "@/app/lib/auth";
import Stats from "@/app/ui/profile/Stats/Stats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estatísticas",
};

export default async function StatsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return;
  }

  const user = session?.user as TUser;

  return <Stats userId={user.id} />;
}
