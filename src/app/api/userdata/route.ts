import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req: NextRequest) {


try {
    
//    user should recive data from the database

const data=await req.json();



const recivedData = await prisma.message.findMany({
    where: {
      messageid: data.messageid,
    },
  });
  
  for (const message of recivedData) {
    const userdata = await prisma.user.findUnique({
      where: {
        id: message.massegecreateduser, // Access the massegecreateduser field from each message
      },
    });

  return NextResponse.json({ userdata }, { status: 200 });
    }

  
  
 
} catch (error) {
   
    return NextResponse.json({ error: "Error while resiving data message" }, { status: 500 });

    
}

}