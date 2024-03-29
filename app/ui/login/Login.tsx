"use client";

import React from "react";
import Input from "@/app/ui/Input";
import Button from "@/app/ui/Button";
import { spectral } from "@/app/ui/fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import FailureAlert from "@/app/ui/FailureAlert";
import { Spinner } from "flowbite-react";
import IconGoogle from "../Icons/IconGoogle";

interface CustomElements extends HTMLFormControlsCollection {
  user: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const callbackUrl = "/profile";

  async function handleSubmit(event: React.FormEvent<CustomForm>) {
    event.preventDefault();

    const { user, password } = event.currentTarget.elements;

    if (!user.value || !password.value) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        user: user.value,
        password: password.value,
        callbackUrl,
      });

      if (res?.error) {
        setError("Credenciais inválidas");
        return;
      }
      router.push(callbackUrl);
    } catch (error: any) {
      setError("Erro ao fazer o login. Tente novamente.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="mt-10 flex flex-col gap-5 p-6 px-3 py-6 xs:px-6 md:mt-0"
      onSubmit={handleSubmit}
    >
      <h1 className={`${spectral.className} title text-5xl`}>Login</h1>

      <Input
        type="text"
        labelText="Usuário / Email"
        name="user"
        autoComplete="username"
      />
      <Input
        type="password"
        labelText="Senha"
        name="password"
        autoComplete="current-password"
      />

      {error && <FailureAlert text={error} />}

      <div className="mt-3">
        <Button loading={loading} type="submit">
          {loading ? <Spinner color="purple" /> : "Entrar"}
        </Button>
      </div>

      <div className="mt-4 flex max-w-md items-center justify-between">
        <span className="w-1/5 border-b lg:w-1/4"></span>

        <p className="text-center text-xs uppercase text-gray-500 ">
          ou faça login com o Google
        </p>

        <span className="w-1/5 border-b  lg:w-1/4"></span>
      </div>

      <Link
        href="#"
        onClick={() => signIn("google", { callbackUrl: "/login/profile" })}
        className="mt-4 flex max-w-md transform items-center justify-center rounded-lg border text-gray-600 transition-colors duration-300 hover:bg-gray-50"
      >
        <div className="px-4 py-2">
          <IconGoogle />
        </div>

        <span className="w-5/6 px-4 py-3 text-center font-bold">
          Entre com o Google
        </span>
      </Link>

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
