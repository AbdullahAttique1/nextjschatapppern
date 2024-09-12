/*
  Warnings:

  - Added the required column `checker` to the `Chattemp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chattemp" DROP CONSTRAINT "Chattemp_id_fkey";

-- AlterTable
ALTER TABLE "Chattemp" ADD COLUMN     "checker" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Chattemp" ADD CONSTRAINT "Chattemp_checker_fkey" FOREIGN KEY ("checker") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
