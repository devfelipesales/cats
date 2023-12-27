import { TUser, authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import FormPost from "@/app/ui/profile/Post/FormPost";

export default async function PostPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return;
  }

  const user = session?.user as TUser;

  return <FormPost id={user.id} />;
}
