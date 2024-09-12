import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req: NextRequest) {


try {
    
//    user should recive data from the database

const data=await req.json();


// const recivedData = await prisma.message.findMany({
//     where: {
//         messageid: data.messageid,
//     },



// });


// console.log(recivedData,"recived data");


// const userdata=prisma.user.findUnique({
//     where: {
//         id: recivedData.massegecreateduser,
//     },
// });





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