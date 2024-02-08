"use client";

import React from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { spectral } from "@/app/ui/fonts";
import FailureAlert from "@/app/ui/FailureAlert";
import Button from "@/app/ui/Button";
import { Tooltip } from "flowbite-react";
import { createUser, TUserState } from "@/app/lib/actions";
import IconInfo from "@/app/ui/Icons/IconInfo";

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const inputEmail = React.useRef<HTMLInputElement>(null);
  const inputPassword = React.useRef<HTMLInputElement>(null);

  let initialState: TUserState = { errors: {}, message: null, sucess: false };

  const [state, dispatch] = useFormState(createUser, initialState);

  React.useEffect(() => {
    if (!state.sucess) {
      return;
    }

    const Redirect = async () => {
      const callbackUrl = "/profile";

      try {
        setLoading(true);
        const res = await signIn("credentials", {
          redirect: false,
          user: inputEmail.current?.value,
          password: inputPassword.current?.value,
          callbackUrl,
        });

        setLoading(false);

        if (!res?.error) {
          router.push(callbackUrl);
        } else {
          state.message = "Erro ao criar o usuário";
        }
      } catch (error: any) {
        setLoading(false);
        state.message = "Erro ao criar o usuário";
        console.error(error);
      }
    };

    Redirect();
  }, [state, router]);

  return (
    <form
      className="mt-10 flex flex-col gap-5 px-3 py-6 xs:px-6 md:mt-0"
      action={dispatch}
    >
      <h1 className={`${spectral.className} title text-5xl`}>Cadastre-se</h1>

      <div>
        <div className="flex gap-1">
          <label
            htmlFor="user"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Usuário
          </label>
          <Tooltip
            content="Max. de 20 caracteres; sem espaço"
            trigger="click"
            animation="duration-500"
            className="opacity-70"
            placement="bottom-start"
          >
            <IconInfo />
          </Tooltip>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 mb-1 flex items-center ps-3.5 text-lg text-gray-600">
            @
          </div>
          <input
            type="text"
            id="user"
            name="user"
            aria-describedby="user-error"
            className="block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 ps-10 text-sm lowercase  text-gray-900 hover:ring-1 hover:ring-indigo-600 focus:ring-indigo-600"
            maxLength={20}
          />
        </div>
        <p className="mt-1 text-[13px] font-medium text-gray-700">
          (você não poderá alterar seu nome de usuário)
        </p>

        {state.errors?.user ? (
          <div
            id="user-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.user.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <svg
              className="h-4 w-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            ref={inputEmail}
            type="email"
            id="email"
            name="email"
            aria-describedby="email-error"
            className="block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 ps-10 text-sm lowercase  text-gray-900 hover:ring-1 hover:ring-indigo-600 focus:ring-indigo-600"
          />
        </div>

        {state.errors?.email ? (
          <div
            id="email-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.email.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Senha
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <svg
              className="h-4 w-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
            </svg>
          </div>
          <input
            ref={inputPassword}
            type="password"
            id="password"
            name="password"
            aria-describedby="password-error"
            className="block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 ps-10 text-sm text-gray-600  hover:ring-1 hover:ring-indigo-600 focus:ring-indigo-600"
          />
        </div>
        {state.errors?.password ? (
          <div
            id="password-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state?.errors.password.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>
      {state?.message && <FailureAlert text={state.message} />}

      <div className="mt-3">
        <Button type="submit">Cadastrar</Button>
      </div>
    </form>
  );
}
