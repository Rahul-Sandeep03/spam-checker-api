/*
  Warnings:

  - You are about to drop the column `isSpam` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SpamReport` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "isSpam";

-- AlterTable
ALTER TABLE "SpamReport" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";

-- AddForeignKey
ALTER TABLE "SpamReport" ADD CONSTRAINT "SpamReport_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
