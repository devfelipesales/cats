/*
  Warnings:

  - A unique constraint covering the columns `[profile]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_key" ON "User"("profile");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userWhoAdd_fkey" FOREIGN KEY ("userWhoAdd") REFERENCES "User"("profile") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userAdded_fkey" FOREIGN KEY ("userAdded") REFERENCES "User"("profile") ON DELETE RESTRICT ON UPDATE CASCADE;
