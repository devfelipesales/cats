/*
  Warnings:

  - You are about to drop the column `userId` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `userProfile` on the `Friend` table. All the data in the column will be lost.
  - Added the required column `userAdded` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userWhoAdd` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_userId_fkey";

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "userId",
DROP COLUMN "userProfile",
ADD COLUMN     "userAdded" TEXT NOT NULL,
ADD COLUMN     "userWhoAdd" TEXT NOT NULL;
