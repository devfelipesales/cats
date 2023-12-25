import Image from "next/image";
import { TUser, authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import FormPost from "@/app/ui/post/FormPost";

export default async function PostPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return;
  }

  const user = session?.user as TUser;

  return (
    <main className="flex flex-wrap justify-between gap-5">
      <FormPost id={user.id} />
      <div>
        <Image
          // src="https://hltukherhizzxvjaqqcj.supabase.co/storage/v1/object/public/photos/958912ab-2b99-4ebb-9072-e983af3b6f2f/919a147b-59f6-42aa-8c2a-7c43d38805d6"
          src="https://hltukherhizzxvjaqqcj.supabase.co/storage/v1/object/public/photos/958912ab-2b99-4ebb-9072-e983af3b6f2f/5a3cb283-b437-4ce2-99b3-8df14f05c25f"
          alt="cat"
          width={300}
          height={300}
          className="mt-6 h-[300px] rounded object-cover shadow-xl"
          priority
        />
      </div>
    </main>
  );
}
