-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_massegecreateduser_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_massegecreateduser_fkey" FOREIGN KEY ("massegecreateduser") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
