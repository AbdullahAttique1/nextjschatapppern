import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { chatarea: string[] } }) {
   
try {
    
    const chatroom = await prisma.chattemp.create({
        data: {

          chatId:"slasikhfasfhsdfhsdlkfhslkf",
          id:"asjdsaldhajkshdkjsahdksa",
          
        },
    });
    return NextResponse.json({ message: 'Chat room created successfully' });
} catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error creating chat room' });
    
    
}


   
}
