import { TUser, authOptions } from "@/app/lib/auth";
import NavFriends from "@/app/ui/profile/Friends/NavFriends";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return;
  }
  const user = session.user as TUser;

  if (!user.profile) {
    return;
  }

  return (
    <>
      <NavFriends loggedUser={user.profile} />
    </>
  );
}
