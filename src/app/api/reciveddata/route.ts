import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req: NextRequest) {


try {
    
//    user should recive data from the database

const recivedData = await prisma.message.findMany({
    where: {
        chatId: "cm0kthwwg000011nhwg9xsi8j",
    },



});

return NextResponse.json({ recivedData }, { status: 200 });
 
} catch (error) {
   
    return NextResponse.json({ error: "Error while resiving data message" }, { status: 500 });

    
}

}