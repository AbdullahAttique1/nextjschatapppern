/*
  Warnings:

  - The `users` column on the `Chattemp` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `userone` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `usertwo` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chattemp" DROP COLUMN "users",
ADD COLUMN     "users" TEXT[];

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "userone",
DROP COLUMN "usertwo";
