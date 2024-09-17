
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



import  Pusher from "pusher"





export  async function POST(req: NextRequest) {


    

// user should add chat data to the database


try {
    

    const  datacom = await req.json();

    if (!datacom.useremail || !datacom.messageid || !datacom.content) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }


  



   

 const mymsg=   await prisma.message.create({
        data: {

            messageid:datacom.messageid,
            content: datacom.content,
            massegecreateduser:datacom.useremail,
            userimage:datacom.userimaage,


    
        },
    });



 

const pusher = new Pusher({
  appId: process.env.REACT_APP_PUSHER_APP_ID || "",
  key: process.env.REACT_APP_PUSHER_KEY || "",
  secret: process.env.REACT_APP_PUSHER_SECRET || "",
  cluster: process.env.REACT_APP_PUSHER_CLUSTER || "",
  useTLS: true
});





pusher.trigger("my-channel", "my-event", {
  message: mymsg
});




    // const io = new Server();
    // io.emit('message1', 'Message added to the database');

  

    return NextResponse.json({ message: "Message added successfully" }, { status: 200 });

} catch (error) {
    console.log(error,"froma d sad");
    return NextResponse.json({ error: "Error while add message" }, { status: 500 });
    
}






}



