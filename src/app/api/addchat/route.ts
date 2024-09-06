
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req: NextRequest) {
    

// user should add chat data to the database


try {
    
    await prisma.message.create({
        data: {
            chatId : "cm0kthwwg000011nhwg9xsi8j",
          content: "Hello World",
    
        },
    });

    return NextResponse.json({ message: "Message added successfully" }, { status: 200 });

} catch (error) {
    console.log(error,"froma d sad");
    return NextResponse.json({ error: "Error while add message" }, { status: 500 });
    
}






}