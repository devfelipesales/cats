import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/ui/Header";
import { AuthProvider } from "./providers/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Cats",
    default: "Cats",
  },
  description:
    "A Rede Social Cats Oficial. Poste fotos dos seus gatos, interaja com outros usuários, comente em outras fotos de gatos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR ">
      <body
        className={`${inter.className} box-border scroll-smooth antialiased`}
      >
        <AuthProvider>
          <Header />
          <div>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
