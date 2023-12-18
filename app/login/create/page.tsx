import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { spectral } from "@/app/ui/fonts";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <form className="mt-10 flex flex-col gap-5 px-3 py-6 xs:px-6 md:mt-0">
      <h1 className={`${spectral.className} title text-5xl`}>Cadastre-se</h1>
      <Input type="text" labelText="Usuário" name="user" maxLength={20} />
      <Input type="email" labelText="Email" name="email" />
      <Input type="password" labelText="Senha" name="password" />

      <div className="mt-3">
        <Button type="submit">Cadastrar</Button>
      </div>
    </form>
  );
}
