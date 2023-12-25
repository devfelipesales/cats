/*
  Warnings:

  - You are about to alter the column `weight` on the `Photos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,1)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Photos" ALTER COLUMN "weight" SET DATA TYPE INTEGER;
