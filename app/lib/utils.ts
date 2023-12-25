import { prismaClient } from "./prisma";

export async function checkUser(user: string) {
  const db_user = await prismaClient.users.findFirst({
    where: {
      profile: user,
    },
  });

  if (db_user) {
    return true;
  }
}

export async function checkEmail(email: string) {
  const db_user = await prismaClient.users.findFirst({
    where: {
      email: email,
    },
  });

  if (db_user) {
    return true;
  }
}
