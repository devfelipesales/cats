import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { spectral } from "@/app/ui/fonts";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <section className=" mx-auto grid max-w-[1400px] items-start md:min-h-screen md:grid-cols-[1.4fr,1.1fr] md:items-center">
      <Image
        src="/loginphoto.jpg"
        alt="Foto da Página de Login"
        width={0}
        height={0}
        sizes="100vw"
        className="hidden h-full w-full object-cover md:block"
        priority
      />
      <form className="xs:px-6 mt-10 flex flex-col gap-5 px-3 py-6 md:mt-0">
        <h1 className={`${spectral.className} title text-5xl`}>Cadastre-se</h1>
        <Input type="text" labelText="Usuário" name="user" maxLength={20} />
        <Input type="email" labelText="Email" name="email" />
        <Input type="password" labelText="Senha" name="password" />

        <div className="mt-3">
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </section>
  );
}
