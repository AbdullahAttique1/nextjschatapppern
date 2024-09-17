import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { chatarea: string[] } }) {
  try {
    // Parse the request JSON data
    const data = await request.json();



    if (data.code !== process.env.Next_secret_code) {
            
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
    
   

    // Fetch the user data by email
    const userdata = await prisma.user.findUnique({
      where: {
        email: data.useremail,
      },
    });

  


    const userid=userdata ? userdata.id : "cm0z4mmfy000012z5bax1pgka";

    // Create a chat room
    const chatroom = await prisma.chattemp.create({
      data: {
        password: data.password,
        chatId: data.randomid,
        checker: userid, // This should be the ID of an existing user
        users: [userid,],
      },
    });

    return NextResponse.json({
      userdata: userdata,
      message: 'Chat room created successfully'
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating chat room' }, 
      { status: 500 } // Status code should be 500 for server errors
    );
  }
}
