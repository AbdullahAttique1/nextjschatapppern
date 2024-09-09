-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- CreateTable
CREATE TABLE "Chattemp" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "users" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chattemp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chattemp" ADD CONSTRAINT "Chattemp_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chattemp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
