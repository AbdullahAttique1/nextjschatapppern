
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Server } from 'socket.io';
import { createServer } from "node:http";






export  async function POST(req: any) {

    const httpServer = createServer(req);
    

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


    const io = new Server(httpServer);

    io.on('connection', (socket) => {
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    });
    httpServer
      .once("error", (err) => {
        console.error(err);
        process.exit(1);
      })


    // const io = new Server();
    // io.emit('message1', 'Message added to the database');

  

    return NextResponse.json({ message: "Message added successfully" }, { status: 200 });

} catch (error) {
    console.log(error,"froma d sad");
    return NextResponse.json({ error: "Error while add message" }, { status: 500 });
    
}






}



