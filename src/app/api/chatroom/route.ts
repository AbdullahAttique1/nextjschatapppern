import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { chatarea: string[] } }) {
   
try {

   

const data =await request.json();


    const chatroom = await prisma.chattemp.create({
        data: {

          chatId: data.randomid,
          checker: data.userid, // This should be the ID of an existing user
          users: [data.userid],
         
        },
      });
      
    return NextResponse.json({ message: 'Chat room created successfully' });
} catch (error) {
    console.log(error);
    return NextResponse.json(
        { message: 'Error creating chat room' }, 
        { status: 505 }
      );
      
    
    
}


   
}
