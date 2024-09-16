import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req: NextRequest) {


try {
    


const data=await req.json();






const recivedData = await prisma.message.findMany({
    where: {
      messageid: data.messageid,
    },
  });
  


  
  

return NextResponse.json({ recivedData }, { status: 200 });
 
} catch (error) {
   
    return NextResponse.json({ error: "Error while resiving data message" }, { status: 500 });

    
}

}