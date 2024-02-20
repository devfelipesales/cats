import InfoProfile from "@/app/ui/profile/InfoProfile/InfoProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informações",
};
export default function Page() {
  return <InfoProfile />;
}
