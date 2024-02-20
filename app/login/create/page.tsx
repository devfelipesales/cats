import CreateAccount from "@/app/ui/login/CreateAccount";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Conta",
};

export default function Page() {
  return <CreateAccount />;
}
