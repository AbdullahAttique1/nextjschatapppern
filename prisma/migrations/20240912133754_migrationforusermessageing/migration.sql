/*
  Warnings:

  - Added the required column `massegecreateduser` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "massegecreateduser" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_massegecreateduser_fkey" FOREIGN KEY ("massegecreateduser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
