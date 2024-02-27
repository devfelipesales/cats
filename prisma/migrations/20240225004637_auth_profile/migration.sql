-- DropIndex
DROP INDEX "User_profile_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile" DROP NOT NULL;
