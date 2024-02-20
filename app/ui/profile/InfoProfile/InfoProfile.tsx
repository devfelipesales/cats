"use client";

import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { useSession } from "next-auth/react";
import { TUser } from "@/app/lib/auth";
import { useEffect, useRef, useState } from "react";
import FailureAlert from "@/app/ui/FailureAlert";
import { updateUserName } from "@/app/lib/actions";
import SucessAlert from "@/app/ui/profile/SucessAlert";
import { fetchIdByProfile } from "@/app/lib/fetchData";
import { Spinner } from "flowbite-react";

interface CustomElements extends HTMLFormControlsCollection {
  profile: HTMLInputElement;
  name: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function InfoProfile() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [initName, setInitName] = useState("");
  const { status, data } = useSession();
  const user = data?.user as TUser;
  const inputName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getUserData() {
      if (!user?.profile) {
        return;
      }

      const userData = await fetchIdByProfile(user.profile);

      if (userData?.name && inputName.current) {
        inputName.current.defaultValue = userData.name;
        setInitName(userData.name);
      }
    }
    getUserData();
  }, [user?.profile]);

  if (status !== "authenticated") {
    return;
  }

  async function handleSubmit(event: React.FormEvent<CustomForm>) {
    event.preventDefault();
    const { name } = event.currentTarget.elements;

    setError("");

    if (!name.value) {
      setError("Preencha um nome");
      return;
    }

    if (name.value === initName) {
      setError("Escolha um nome diferente");
      return;
    }

    setLoading(true);

    const errorMessage = await updateUserName(user?.id, name.value);

    if (errorMessage) {
      setError(errorMessage);
    }
    setInitName(name.value);
    setLoading(false);
    setSucess(true);
    setTimeout(() => {
      setSucess(false);
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="profile"
        labelText="Usuário"
        labelClass="text-indigo-900"
        className="cursor-not-allowed hover:ring-0 hover:ring-transparent focus:ring-0"
        disabled
        value={user?.profile}
      />
      <p className="mt-1 text-[13px] font-medium italic text-gray-700">
        (você não pode alterar seu nome de usuário)
      </p>
      <div className="my-5">
        <label
          htmlFor="name"
          className={`mb-2 block text-sm font-medium text-indigo-900`}
        >
          Nome de Exibição
        </label>

        <input
          ref={inputName}
          id="name"
          name="name"
          className={`block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 hover:ring-1 hover:ring-indigo-600 focus:ring-indigo-600`}
        />
        <p className="mt-1 text-[13px] font-medium italic text-gray-700">
          (nome exibido ao acessarem o seu perfil)
        </p>
      </div>

      <Button loading={loading}>
        {loading ? <Spinner color="purple" /> : "Alterar"}
      </Button>
      <div className="mt-5 opacity-100">
        {error && <FailureAlert text={error} />}
        {
          <SucessAlert
            addClass={sucess ? "opacity-100" : "opacity-0"}
            text={"Nome alterado com sucesso!"}
          />
        }
      </div>
    </form>
  );
}
