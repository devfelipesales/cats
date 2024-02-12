/*
  Warnings:

  - Made the column `viewedBy` on table `Views` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_viewedBy_fkey";

-- AlterTable
ALTER TABLE "Views" ALTER COLUMN "viewedBy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_viewedBy_fkey" FOREIGN KEY ("viewedBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
