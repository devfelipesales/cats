"use server";

import { v4 as uuidv4 } from "uuid";
import { supabase } from "./supabase";
import { prismaClient } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hash } from "bcrypt";
import { photoUploadValidation, userCreateValidation } from "./validations";

export type TUploadPhoto = {
  errors: {
    file?: string[] | undefined;
    name?: string[] | undefined;
    age?: string[] | undefined;
    weight?: string[] | undefined;
  };
  message: string | null;
  sucess: boolean;
};

export async function uploadPhoto(
  userId: string,
  prevState: TUploadPhoto,
  formData: FormData,
) {
  const file = formData.get("file");
  const name = formData.get("name")?.toString().trim();
  const age = Number(formData.get("age")?.toString());
  const weight = Number(formData.get("weight")?.toString());

  const returnState = await photoUploadValidation(file, name, age, weight);

  if (!returnState.sucess) {
    return returnState;
  }

  const photoName = uuidv4();

  const { data, error } = await supabase.storage
    .from("photos")
    .upload(userId + "/" + photoName, file!);

  if (!data) {
    returnState.message = "Verifique a extensão e o tamanho do arquivo.";
    returnState.sucess = false;
    console.error(error);
    return returnState;
  }

  try {
    console.log("USERID --");
    console.log(userId);

    const filepath = data.path;
    await prismaClient.photos.create({
      data: {
        id: photoName,
        userId: userId,
        name: name as string,
        age: age,
        weight: weight,
        filepath: filepath,
      },
    });
  } catch (error) {
    returnState.message = "Erro fazer upload do arquivo";
    returnState.sucess = false;
    console.error(error);
    return returnState;
  }

  revalidatePath("/profile");
  redirect("/profile");
}

export type TUserState = {
  errors: {
    user?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
  message: string | null;
  sucess: boolean;
};

export async function createUser(prevState: TUserState, formData: FormData) {
  const user = formData.get("user")?.toString().toLowerCase().trim();
  const email = formData.get("email")?.toString().toLowerCase().trim();
  const password = formData.get("password")?.toString().trim();

  const returnState = await userCreateValidation(user, email, password);

  if (!returnState.sucess) {
    return returnState;
  }

  const hashedPassword = await hash(password as string, 10);

  try {
    await prismaClient.users.create({
      data: {
        profile: user!,
        name: user!,
        email: email!,
        password: hashedPassword,
      },
    });
  } catch (error) {
    returnState.message = "Erro ao criar o usuário";
    returnState.sucess = false;
    console.error(error);
    return returnState;
  }

  console.log("Usuário Criado com sucesso");
  returnState.sucess = true;
  return returnState;
}
