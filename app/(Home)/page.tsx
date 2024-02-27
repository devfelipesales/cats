import { getServerSession } from "next-auth";
import Feed from "../ui/feed/Feed";
import { TUser, authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const user = session.user as TUser;

    if (!user.profile) {
      redirect("/login/profile");
    }
  }

  return (
    <main className="container">
      <Feed />
    </main>
  );
}
