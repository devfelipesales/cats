import { TUser, authOptions } from "@/app/lib/auth";
import CreateAccount from "@/app/ui/login/CreateAccount";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Criar Conta",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const user = session.user as TUser;

    if (!user.profile) {
      redirect("/login/profile");
    }

    redirect("/profile");
  }

  return <CreateAccount />;
}
