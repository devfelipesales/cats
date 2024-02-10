import IconFaceFrown from "@/app/ui/Icons/IconFaceFrown";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mt-24 flex flex-col items-center justify-center gap-2">
      <IconFaceFrown />

      <h2 className="text-xl font-semibold">404 - Página não encontrada</h2>
      <p className="text-red-600">Não foi possível encontrar o usuário</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-3  font-medium text-black transition-colors hover:text-white"
      >
        Retornar
      </Link>
    </main>
  );
}
