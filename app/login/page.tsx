import { Metadata } from "next";
import LoginPage from "../ui/login/Login";
import { getServerSession } from "next-auth";
import { TUser, authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const user = session.user as TUser;

    if (!user.profile) {
      redirect("/login/profile");
    }

    redirect("/profile");
  }

  return <LoginPage />;
}
