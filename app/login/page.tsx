import { Metadata } from "next";
import LoginPage from "../ui/login/Login";

export const metadata: Metadata = {
  title: "Login",
};

export default function page() {
  return <LoginPage />;
}
