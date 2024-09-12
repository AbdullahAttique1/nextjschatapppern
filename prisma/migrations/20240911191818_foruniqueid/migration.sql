/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `Chattemp` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Chattemp" DROP CONSTRAINT "Chattemp_chatId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Chattemp_chatId_key" ON "Chattemp"("chatId");

-- AddForeignKey
ALTER TABLE "Chattemp" ADD CONSTRAINT "Chattemp_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
