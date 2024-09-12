'use client'
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Chatui() {
  const [messagetext, setMessageText] = useState("");
  const [resivemessage, setResivemessage] = useState<any[]>([]);
  const [useremail, setUseremail] = useState<string | null>(null);

  const pathname = usePathname();
  const { data: session, status } = useSession(); // Destructure status
  const router = useRouter();
  
  useEffect(() => {
    async function logUser() {
      // Check if the session status is 'loading'
      if (status === 'loading') {
        return; // Do nothing if session is still loading
      }
      
      // Check if session exists and if it has a valid email
      if (!session?.user?.email) {
       
          router.push('/'); // Redirect to home page if not logged in
      
      }
    }
  
    logUser(); // Call the function directly
  }, [session, status, router]); // Include status in dependencies
  
  
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data
        const userResponse = await fetch("/api/userdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messageid: pathname.split("/")[2] }),
        });
        const userData = await userResponse.json();
        setUseremail(userData.userdata.id);

        // Fetch messages
        const messageResponse = await fetch("/api/reciveddata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messageid: pathname.split("/")[2] }),
        });
        const messageData = await messageResponse.json();
        setResivemessage(messageData.recivedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [pathname]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageid = pathname.split("/")[2];
    const useremailsend = session?.user?.email;

    const res = await fetch("/api/addchat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        useremail: useremailsend,
        messageid,
        content: messagetext,
      }),
    });

    if (res.ok) {
      alert("Message sent successfully");
      setMessageText("");
    } else {
      console.log("Error sending message");
    }
  };
  
  

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-1 overflow-auto p-4 w-full">
        <div className="grid gap-4 w-full">
          {Array.isArray(resivemessage) && resivemessage.length > 0 &&
            resivemessage.map((message: any) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.massegecreateduser === useremail ? 'justify-end' : 'justify-start'
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={session?.user?.image ?? "/placeholder-user.jpg"} alt="Avatar" />
                  <AvatarFallback>{message.chatId}</AvatarFallback>
                </Avatar>
                <div
                  className={`${
                    message.massegecreateduser === useremail
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  } rounded-lg p-4 max-w-[80%] flex`}
                >
                  <p>{message.content}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-background border-t border-muted px-4 py-2 flex items-center gap-2">
        <form className="w-full relative" onSubmit={handleSendMessage}>
          <Textarea
            value={messagetext}
            onChange={(e) => setMessageText(e.target.value)}
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
