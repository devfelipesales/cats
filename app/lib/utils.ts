import { prismaClient } from "./prisma";

export async function checkUser(user: string) {
  const db_user = await prismaClient.user.findFirst({
    where: {
      profile: user,
    },
  });

  if (db_user) {
    return true;
  }
}

export async function checkEmail(email: string) {
  const db_user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (db_user) {
    return true;
  }
}

export const formatDateToLocal = (date: Date, locale: string = "pt-BR") => {
  return date.toLocaleDateString(locale, {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

export const formatTimeToLocal = (date: Date, locale: string = "pt-BR") => {
  return date.toLocaleTimeString(locale, {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });
};
