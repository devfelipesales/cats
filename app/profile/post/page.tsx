import React from "react";
import { uploadPhoto } from "../../lib/actions";
import Image from "next/image";
import Button from "../../ui/Button";
import Input from "@/app/ui/Input";
import InputFile from "@/app/ui/InputFile";

export default function ProfilePage() {
  return (
    <main className="flex flex-wrap justify-between gap-5">
      <form className="flex flex-col gap-5" action={uploadPhoto}>
        <Input type="text" labelText="Nome" name="name" />
        <Input type="number" labelText="Idade" name="age" placeholder="0" />
        <Input
          type="number"
          labelText="Peso"
          name="weight"
          placeholder="Digite o peso em kg"
        />
        <InputFile />
        <div className="mt-3">
          <Button type="submit">Enviar</Button>
        </div>
      </form>
      <div>
        <Image
          // src="https://hltukherhizzxvjaqqcj.supabase.co/storage/v1/object/public/photos/958912ab-2b99-4ebb-9072-e983af3b6f2f/919a147b-59f6-42aa-8c2a-7c43d38805d6"
          src="https://hltukherhizzxvjaqqcj.supabase.co/storage/v1/object/public/photos/958912ab-2b99-4ebb-9072-e983af3b6f2f/5a3cb283-b437-4ce2-99b3-8df14f05c25f"
          alt="cat"
          width={300}
          height={300}
          className="mt-6 h-[300px] rounded object-cover shadow-xl"
          priority
        />
      </div>
    </main>
  );
}
