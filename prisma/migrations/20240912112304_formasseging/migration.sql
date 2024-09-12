-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chattemp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
