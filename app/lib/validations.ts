import { TUploadPhoto, TUserState } from "./actions";
import { checkEmail, checkUser } from "./utils";

export async function userCreateValidation(
  user: string | undefined,
  email: string | undefined,
  password: string | undefined,
) {
  let returnState: TUserState = {
    errors: { user: [], email: [], password: [] },
    message: null,
    sucess: false,
  };

  if (!user) {
    returnState.errors.user?.push("Preencha o usuário");
  } else {
    const regexp = /^\S*$/u; // Regex p/ verificação de espaços entre palavras
    if (!regexp.test(user)) {
      returnState.errors.user?.push("Espaços não são permitidos");
    }
    if (user.length > 20) {
      returnState.errors.user?.push("Máximo de 20 caracteres");
    }
  }

  if (!email) {
    returnState.errors.email?.push("Preencha o email");
  } else {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // regex para e-mail

    if (!regexp.test(email)) {
      returnState.errors.email?.push("Insira um e-mail válido");
    }
  }

  if (!password) {
    returnState.errors.password?.push("Preencha a senha");
  }

  if (returnState.errors.user?.length === 0) {
    const userExists = await checkUser(user!);

    if (userExists) {
      returnState.errors.user?.push("Usuário já cadastrado");
    }
  }

  if (returnState.errors.email?.length === 0) {
    const emailExists = await checkEmail(email!);
    if (emailExists) {
      returnState.errors.email?.push("Email já cadastrado");
    }
  }

  if (
    returnState.errors.user?.length === 0 &&
    returnState.errors.email?.length === 0 &&
    returnState.errors.password?.length === 0
  ) {
    returnState.sucess = true;
  } else {
    returnState.message = "Preencha os campos corretamente.";
  }

  return returnState;
}

export async function photoUploadValidation(
  file: any | null,
  name: string | undefined,
  age: number | undefined,
  weight: number | undefined,
) {
  let returnState: TUploadPhoto = {
    errors: { file: [], name: [], age: [], weight: [] },
    message: null,
    sucess: false,
  };

  if (!file?.size) {
    returnState.errors.file?.push("Preencha o arquivo");
  }

  if (!name) {
    returnState.errors.name?.push("Preencha o nome");
  }

  if (!age) {
    returnState.errors.age?.push("Preencha a idade");
  }

  if (!weight) {
    returnState.errors.weight?.push("Preencha o peso");
  }

  if (
    returnState.errors.file?.length === 0 &&
    returnState.errors.name?.length === 0 &&
    returnState.errors.age?.length === 0 &&
    returnState.errors.weight?.length === 0
  ) {
    returnState.sucess = true;
  } else {
    returnState.message = "Preencha todos os campos";
  }

  return returnState;
}
