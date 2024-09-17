/*
  Warnings:

  - Added the required column `password` to the `Chattemp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chattemp" ADD COLUMN     "password" TEXT NOT NULL;
