import { TUser, authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import Feed from "../ui/feed/Feed";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return;
  }

  const user = session?.user as TUser;

  return <Feed userId={user.id} />;
}
