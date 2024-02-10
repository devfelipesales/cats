import { fetchIdByProfile } from "@/app/lib/fetchData";
import Feed from "@/app/ui/feed/Feed";
import { spectral } from "@/app/ui/fonts";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await fetchIdByProfile(params.username);

  if (!user?.id) {
    notFound();
  }

  return (
    <div className="container">
      <h1
        className={`${spectral.className} subtitle mb-10 break-all text-4xl xs:text-5xl`}
      >
        {user?.name}
      </h1>

      <Feed userId={user?.id} />
    </div>
  );
}
