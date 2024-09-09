'use client'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { prisma } from "@/prisma";
import { signIn, signOut, useSession } from "next-auth/react";

import { useEffect, useState } from "react"

export default function Chatui() {


const [messagetext,setMessageText]=useState("")

const [resivemessage, setResivemessage] = useState<any[]>([]);
const [useremail,setUseremail]=useState("")


const handleSendMessage=async()=>{

  const res = await fetch("/api/addchat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chatId : "cm0kthwwg000011nhwg9xsi8j",
            content: messagetext,
        }),
    });

    if (res.ok) {
        alert("Message sent successfully");
        console.log("Message sent successfully");
        setMessageText("");
    } else {
        console.log("Error sending message");
    }


    
}

async function getMessages() {
    try {
        const messagesFromDatabase = await fetch("/api/reciveddata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chatId: "cm0kthwwg000011nhwg9xsi8j",
            }),
        });
        const data = await messagesFromDatabase.json();




        // Assuming data has a structure like { ObjectrecivedData: [...] }
        setResivemessage(data.recivedData); // Access the correct array here
    } catch (error) {
        console.log(error, "from database");
    }
}


useEffect(() => {
    getMessages();
}, []); // Empty dependency array ensures the function runs only once




  const { data: session } = useSession();

 


   

  useEffect(() => {
    if (session?.user?.id) {
      setUseremail(session.user.id);
    }
  }, [session]);




// cm0kthwwg000011nhwg9xsi8j
// cm0kthwwg000011nhwg9xsi8j
// cm0nv94ua00061as1o8pzodfs

  return (

    <>

{useremail} 
<div className="flex flex-col h-screen">
  {/* Messages container */}
  <div className="flex-1 overflow-auto p-4">
    <div className="grid gap-4">
      {/* Dynamic Messages */}
      {Array.isArray(resivemessage) && resivemessage.length > 0 && resivemessage.map((message: any) => (
        <div key={message.id} className="flex items-start gap-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
            <AvatarFallback>{message.chatId}</AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-lg p-4 max-w-[80%]">
            <p>{message.content}</p>
            <div className="text-xs text-muted-foreground mt-1">
              {new Date(message.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}

      {/* Static Sample Messages */}
      <div className="flex items-start gap-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="bg-muted rounded-lg p-4 max-w-[80%]">
          <p>Hey there! How's it going?</p>
          <div className="text-xs text-muted-foreground mt-1">10:30 AM</div>
        </div>
      </div>

      <div className="flex items-start gap-4 justify-end">
        <div className="bg-primary rounded-lg p-4 max-w-[80%] text-primary-foreground">
          <p>I'm doing great, thanks for asking!</p>
          <div className="text-xs text-primary-foreground/80 mt-1">10:31 AM</div>
        </div>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex items-start gap-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="bg-muted rounded-lg p-4 max-w-[80%]">
          <p>That's great to hear! I have some exciting news to share.</p>
          <div className="text-xs text-muted-foreground mt-1">10:32 AM</div>
        </div>
      </div>

      <div className="flex items-start gap-4 justify-end">
        <div className="bg-primary rounded-lg p-4 max-w-[80%] text-primary-foreground">
          <p>Oh, what is it? I can't wait to hear!</p>
          <div className="text-xs text-primary-foreground/80 mt-1">10:33 AM</div>
        </div>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </div>

  {/* Message Input Section */}
  <div className="bg-background border-t border-muted px-4 py-2 flex items-center gap-2">
    <form className="w-full relative">
      <Textarea
        value={messagetext}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 resize-none rounded-lg pr-12 w-full"
        rows={1}
      />

      <Button
        onClick={handleSendMessage}
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-4 bg-black text-white"
      >
        <SendIcon className="w-5 h-5" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  </div>
</div>



         </>
  )
}





function SendIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}