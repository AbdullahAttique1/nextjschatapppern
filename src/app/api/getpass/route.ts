import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req: NextRequest) {


try {
    
const data=await req.json();

if (data.code !== process.env.Next_secret_code) {
  
  return NextResponse.json({ error: "Invalid code" }, { status: 400 });
}

const recivedData = await prisma.chattemp.findMany({
    where: {
        chatId: data.messageid,
    }, 
  });
  
  

return NextResponse.json({ recivedData }, { status: 200 });
 
} catch (error) {
   
    return NextResponse.json({ error: "Error while resiving data message" }, { status: 500 });

    
}

}