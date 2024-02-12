-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_viewedBy_fkey";

-- AlterTable
ALTER TABLE "Views" ALTER COLUMN "viewedBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_viewedBy_fkey" FOREIGN KEY ("viewedBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
