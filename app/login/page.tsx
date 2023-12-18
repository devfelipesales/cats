import Image from "next/image";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { spectral } from "../ui/fonts";
import Link from "next/link";

export default function LoginPage() {
  return (
    <form className="mt-10 flex flex-col gap-5 p-6 px-3 py-6 xs:px-6 md:mt-0">
      <h1 className={`${spectral.className} title text-5xl`}>Login</h1>
      <Input type="text" labelText="Usuário / Email" name="user" />
      <Input type="password" labelText="Senha" name="password" />

      <div className="mt-3">
        <Button type="submit">Entrar</Button>
      </div>

      <div className="mt-10">
        <h2 className={`${spectral.className} subtitle text-4xl`}>
          Cadastre-se
        </h2>
        <p className="mt-8 ">Ainda não possui conta?</p>
        <Link
          href="/login/create"
          className="mt-1 font-medium text-indigo-600 underline hover:text-indigo-400"
        >
          Cadastre-se no site.
        </Link>
      </div>
    </form>
  );
}
