'use client';

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useChannel } from "ably/react";
import * as Ably from 'ably';
import Logger from "./logger";

export default function Chatui() {
  const [messagetext, setMessageText] = useState("");
  const [resivemessage, setResivemessage] = useState<any[]>([]);
  const [localemail, setlocaluseremail] = useState<string | null | undefined>(null);

  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function logUser() {
      if (status === 'loading') {
        return;
      }
      
      if (!session?.user?.email) {
        router.push('/');
      }
    }
  
    logUser();
  }, [session, status, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (status !== 'authenticated') {
          return;
        }
    
        const useremailsend = session?.user?.email;
        
        const messageResponse = await fetch("/api/reciveddata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            useremail: useremailsend,
            messageid: pathname.split("/")[2],
            code: "R+kqTxhpjSk32gt6U3SA9Sj2+pj1OPbhWD7kksLniGc=",
          }),
        });

        if (!messageResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const messageData = await messageResponse.json();
        setResivemessage(messageData.recivedData);
        
      } catch (error) {
        console.error("Error receiving data", error);
      }
    }

    fetchData();
  }, [pathname, session, status]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageid = pathname.split("/")[2];
    const useremailsend = session?.user?.email;
    const userimage = session?.user?.image;

    const res = await fetch("/api/addchat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        useremail: useremailsend,
        messageid,
        content: messagetext,
        userimage: userimage,
        code: "R+kqTxhpjSk32gt6U3SA9Sj2+pj1OPbhWD7kksLniGc=",
      }),
    });
 
    if (res) {  
      const data = await res.json();
      console.log(data, "response data");

      if (channel === null) return;
      
      channel.publish('update-from-client', {
        text: `${JSON.stringify(data)}`
      });

      setResivemessage((prevMessages) => {
        const updatedMessages = [...prevMessages, data.mymsg];
        return updatedMessages;
      });
      
    
      



      toast("Message sent successfully", {
        duration: 3000,
        position: "top-center",
      });

      setMessageText("");
    } else {
      console.log("Error sending message");
    }
  };

  useEffect(() => {
    const localemail = session?.user?.email;
    setlocaluseremail(localemail);
  }, [session]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [resivemessage]);

  const { channel } = useChannel("status-updates", (message: Ably.Message) => {
    setResivemessage((prevMessages) => {
      const updatedMessages = [...prevMessages, message.data.text];

      const newMessageSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3');
      newMessageSound.play();

      return updatedMessages;
    });
  });

  console.log(resivemessage, "resivemessage");

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-1 overflow-auto md:p-4 w-full">
        <div className="flex flex-col w-full h-full">

        <div className="grid gap-4 w-full overflow-y-auto no-scrollbar" style={{ maxHeight: '80vh' }}>
  {Array.isArray(resivemessage) && resivemessage.length > 0 &&
    resivemessage
      .filter((message: any) => message.content && message.content.trim() !== "") // Ensure message content exists and is not empty
      .map((message: any) => (
        <div
          key={message.id}
          className={`flex items-start gap-4 ${localemail === message.massegecreateduser ? 'justify-end' : 'justify-start'}`}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={message.userimage ?? "https://static.vecteezy.com/system/resources/thumbnails/030/504/836/small/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg"} alt="Avatar" />
            <AvatarFallback>{message.chatId}</AvatarFallback>
          </Avatar>

          <div className={`${localemail === message.massegecreateduser ? "bg-blue-500 text-white" : "bg-black text-white"} rounded-lg p-4 max-w-[80%] flex flex-col`}>
            <p>{message.content}</p>
            <div className="text-xs text-[#d5d5d5] mt-1">
              {new Date(message.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
  <div ref={messagesEndRef} />
</div>


        </div>
      </div>

      <div className="bg-background border-t border-muted px-1 py-2 flex fixed bottom-1 left-0 w-full items-center">
        <form className="w-full relative" onSubmit={handleSendMessage}>
          <Textarea
            value={messagetext}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder="Type your message..."
            className="flex-1 resize-none rounded-lg pr-12 w-full"
            rows={1}
          />
          <Button
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
  );
}

function SendIcon(props: any) {
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
  );
}
