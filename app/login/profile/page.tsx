import { TUser, authOptions } from "@/app/lib/auth";
import LoginGoogle from "@/app/ui/login/LoginGoogle";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};
export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as TUser;

  if (user.profile) {
    redirect("/profile");
  }

  return <LoginGoogle />;
}
