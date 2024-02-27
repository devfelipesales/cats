"use client";

import { Spinner } from "flowbite-react";
import { spectral } from "../fonts";
import { useState } from "react";
import Button from "../Button";
import { updateProfile } from "@/app/lib/actions";
import { signIn, useSession } from "next-auth/react";
import { TUser } from "@/app/lib/auth";

interface CustomElements extends HTMLFormControlsCollection {
  user: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function LoginGoogle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data } = useSession();

  if (!data) {
    return;
  }

  const { id } = data.user as TUser;

  async function handleSubmit(event: React.FormEvent<CustomForm>) {
    event.preventDefault();
    const { user } = event.currentTarget.elements;

    if (!user.value) {
      setError("Preencha o usuário");
      return;
    }
    setLoading(true);

    try {
      const errorMessage = await updateProfile(id, user.value);
      if (errorMessage) {
        setError(errorMessage);

        return;
      }
    } catch (error) {
      setError(`Ocorreu um erro: ${error}`);
    } finally {
      setLoading(false);
    }

    signIn("google", { callbackUrl: "/profile" });
  }

  return (
    <form
      className="mt-10 flex flex-col gap-5 px-3 py-6 xs:px-6 md:mt-0"
      onSubmit={handleSubmit}
    >
      <h1 className={`${spectral.className} subtitle text-4xl`}>
        Concluir Cadastro
      </h1>
      <h2 className="my-1 text-lg font-semibold text-gray-900 ">
        Você precisa criar um nome de usuário
      </h2>
      <ul className="max-w-md list-inside list-disc space-y-1 text-gray-500 ">
        <li>Máximo de 20 caracteres;</li>
        <li>Sem espaços entre palavras;</li>
        <li>O nome do usuário é único.</li>
      </ul>

      <div>
        <div className="flex gap-1">
          <label
            htmlFor="user"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Usuário
          </label>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 mb-1 flex items-center ps-3.5 text-lg text-gray-600">
            @
          </div>
          <input
            type="text"
            id="user"
            name="user"
            required
            aria-describedby="user-error"
            className="block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 ps-10 text-sm lowercase  text-gray-900 hover:ring-1 hover:ring-indigo-600 focus:ring-indigo-600"
            maxLength={20}
          />
        </div>
        <p className="mt-1 text-[13px] font-medium text-gray-700">
          (você não poderá alterar seu nome de usuário)
        </p>

        {error ? (
          <div
            id="user-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            <p>{error}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-3">
        <Button loading={loading} type="submit">
          {loading ? <Spinner color="purple" /> : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}
