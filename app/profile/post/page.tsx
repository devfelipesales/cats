import { TUser, authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import FormPost from "@/app/ui/profile/Post/FormPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postar Foto",
};

export default async function PostPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return;
  }

  const user = session?.user as TUser;

  return <FormPost id={user.id} />;
}
