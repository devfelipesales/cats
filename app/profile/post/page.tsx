import React from "react";
import { uploadPhoto } from "../../lib/actions";
import Image from "next/image";
import Button from "../../ui/Button";

export default function ProfilePage() {
  return (
    <main className="flex justify-between gap-4">
      <form className="flex flex-col gap-5" action={uploadPhoto}>
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label
            htmlFor="age"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Idade
          </label>
          <input
            type="number"
            id="age"
            name="age"
            aria-describedby="helper-text-explanation"
            className="block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600"
            placeholder=""
          />
        </div>
        <div>
          <label
            htmlFor="weight"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Peso
          </label>
          <input
            type="number"
            step="0.1"
            id="weight"
            name="weight"
            aria-describedby="helper-text-explanation"
            className="block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600"
            placeholder=""
          />
        </div>

        <div>
          <input
            className="block w-full max-w-md cursor-pointer rounded-lg border border-gray-300 bg-gray-100 text-sm text-gray-900 "
            aria-describedby="file_input_help"
            id="file"
            name="file"
            type="file"
          />
          <p
            className="ml-1 mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 3MB 800x400px).
          </p>
        </div>
        <div className="mt-3">
          <Button type="submit">Enviar</Button>
        </div>
      </form>
      <div>
        <Image
          src="https://hltukherhizzxvjaqqcj.supabase.co/storage/v1/object/public/photos/958912ab-2b99-4ebb-9072-e983af3b6f2f/919a147b-59f6-42aa-8c2a-7c43d38805d6"
          // src="https://hltukherhizzxvjaqqcj.supabase.co/storage/v1/object/public/photos/958912ab-2b99-4ebb-9072-e983af3b6f2f/5a3cb283-b437-4ce2-99b3-8df14f05c25f"
          alt="cat"
          width={300}
          height={300}
          className="rounded object-cover"
        />
      </div>
    </main>
  );
}
