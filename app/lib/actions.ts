"use server";

import { v4 as uuidv4 } from "uuid";
import { supabase } from "./supabase";
import { prismaClient } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hash } from "bcrypt";
import { photoUploadValidation, userCreateValidation } from "./validations";
import { checkUser } from "./utils";
import { FriendStatus } from "@prisma/client";

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
    await prismaClient.user.create({
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

export async function createComment(
  userId: string,
  photoId: string,
  comment: string,
) {
  try {
    const data = await prismaClient.comments.create({
      data: {
        userId: userId,
        photoId: photoId,
        comment: comment,
      },
    });
    revalidatePath("/");
    return data;
  } catch (error) {
    console.error("Erro ao criar o comentário");
  }
}

export async function addCountView(photoId: string, userId: string) {
  try {
    const data = await prismaClient.views.create({
      data: {
        photoId: photoId,
        viewedBy: userId,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao criar a visualização");
  }
}

export async function updateUserName(userId: string, name: string) {
  let messageError: string = "";

  try {
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    });
  } catch (error) {
    console.error(`Erro ${error}`);
    messageError = "Erro ao atualizar o nome";
    return messageError;
  }
}

export async function updateProfile(userId: string, profile: string) {
  let messageError: string = "";

  const user = profile.toLowerCase().trim();
  const userExists = await checkUser(user);

  if (userExists) {
    messageError = "Usuário já cadastrado";
    return messageError;
  }

  const regexp = /^\S*$/u; // Regex p/ verificação de espaços entre palavras
  if (!regexp.test(user)) {
    messageError = "Espaços não são permitidos";
    return messageError;
  }
  if (user.length > 20) {
    messageError = "Máximo de 20 caracteres";
    return messageError;
  }

  try {
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        profile: user,
      },
    });
  } catch (error) {
    console.error(`Erro ${error}`);
    messageError = "Erro ao atualizar o usuário";
    return messageError;
  }
}

export async function addFriend(loggedUser: string, profileUser: string) {
  try {
    const data = await prismaClient.friend.create({
      data: {
        userWhoAdd: loggedUser,
        userAdded: profileUser,
        status: "PENDING",
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao adicionar o usuário");
  }
}

export async function removeFriend(id: string) {
  try {
    const data = await prismaClient.friend.delete({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao remover o usuário");
  }
}

export async function updateFriendStatus(id: string, status: FriendStatus) {
  try {
    const data = await prismaClient.friend.update({
      data: {
        status: status,
      },
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar o usuário");
  }
}
