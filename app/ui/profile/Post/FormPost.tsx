"use client";

import { TUploadPhoto, uploadPhoto } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import FailureAlert from "../../FailureAlert";
import Button from "../../Button";
import Input from "../../Input";
import { useState } from "react";
import ImagePreview from "./ImagePreview";

export default function FormPost({ id }: { id: string }) {
  const uploadPhotoWithId = uploadPhoto.bind(null, id);
  let initialState: TUploadPhoto = { errors: {}, message: null, sucess: false };
  const [state, dispatch] = useFormState(uploadPhotoWithId, initialState);

  const [imagePreview, setImagePreview] = useState("");

  function handleImgChange({
    target,
  }: {
    target: EventTarget & HTMLInputElement;
  }) {
    if (!target.files?.length) {
      return;
    }
    setImagePreview(URL.createObjectURL(target.files[0]));
  }

  return (
    <section className="flex flex-wrap justify-between gap-5">
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
          <div>
            <input
              className="block w-full max-w-md cursor-pointer rounded-lg border border-gray-300 bg-gray-100 pr-4 text-sm text-gray-900"
              aria-describedby="file_input_help"
              id="file"
              name="file"
              type="file"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleImgChange}
            />
            <p
              className="ml-1 mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              JPG, PNG ou GIF (max. 3MB).
            </p>
          </div>
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
      <ImagePreview url={imagePreview} />
    </section>
  );
}
