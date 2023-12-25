"use client";

import { TUploadPhoto, uploadPhoto } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import InputFile from "../InputFile";
import FailureAlert from "../FailureAlert";
import Button from "../Button";
import Input from "../Input";
import { redirect } from "next/navigation";

export default function FormPost({ id }: { id: string }) {
  const uploadPhotoWithId = uploadPhoto.bind(null, id);
  let initialState: TUploadPhoto = { errors: {}, message: null, sucess: false };
  const [state, dispatch] = useFormState(uploadPhotoWithId, initialState);

  return (
    <form className="flex flex-col gap-5" action={dispatch}>
      <div>
        <Input type="text" labelText="Nome" name="name" />
        {state.errors?.name ? (
          <div
            id="user-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.name.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <Input type="number" labelText="Idade" name="age" placeholder="0" />

        {state.errors?.age ? (
          <div
            id="user-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.age.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <Input
          type="number"
          labelText="Peso"
          name="weight"
          placeholder="Digite o peso em kg"
        />
        {state.errors?.weight ? (
          <div
            id="user-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.weight.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <InputFile />
        {state.errors?.file ? (
          <div
            id="user-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.file.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>
      {state?.message && <FailureAlert text={state.message} />}
      <div className="mt-3">
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
}
