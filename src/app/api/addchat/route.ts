
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req: NextRequest) {
    

// user should add chat data to the database


try {
    

    const  datacom = await req.json();

    if (!datacom.useremail || !datacom.messageid || !datacom.content) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }


  



   

    await prisma.message.create({
        data: {

            messageid:datacom.messageid,
            content: datacom.content,
            massegecreateduser:datacom.useremail,
            userimage:datacom.userimaage,


    
        },
    });

    return NextResponse.json({ message: "Message added successfully" }, { status: 200 });

} catch (error) {
    console.log(error,"froma d sad");
    return NextResponse.json({ error: "Error while add message" }, { status: 500 });
    
}






}



