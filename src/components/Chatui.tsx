'use client'
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Pusher from 'pusher-js';
import { toast } from "sonner"


export default function Chatui() {
  const [messagetext, setMessageText] = useState("");
  const [resivemessage, setResivemessage] = useState<any[]>([]);
  const [localemail, setlocaluseremail] = useState<string | null | undefined>(null);





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
  
  
 //pusher area

useEffect(() => {
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  const pusher = new Pusher('5965b87946c0af181a16', {
    cluster: 'ap2',
  });

  const channel = pusher.subscribe('my-channel');
  channel.bind('my-event', (data:any) => {
    // console.log(data.message.message,"data from pusher");
    const mymsging=JSON.stringify(data)


  
    
    const parsedData = JSON.parse(mymsging);
 

    const newMessageSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3'); // Add the correct path to your audio file

    setResivemessage((prevMessages) => {
      const updatedMessages = [...prevMessages, data.message];
      console.log(updatedMessages, "updated messages");
    
      // Play the audio when a new message is added
      newMessageSound.play();
    
      return updatedMessages;
    });
    

   
   

    const message = parsedData.message;

const id = message.id;
const content = message.content;
console.log(id,content,"id and content");




    
   
  
  });

  // Clean up when component unmounts
  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
}, []);
  
  useEffect(() => {

    async function fetchData() {

      try {
    
        // Fetch messages
        if (status !== 'authenticated') {
          // Wait until the session is fully authenticated
          return;
        }
    
        const useremailsend = session?.user?.email;
        
        const messageResponse = await fetch("/api/reciveddata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            useremail: useremailsend,
            messageid: pathname.split("/")[2],
            code:"R+kqTxhpjSk32gt6U3SA9Sj2+pj1OPbhWD7kksLniGc=",
          }),
        });

        if (!messageResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const messageData = await messageResponse.json();

        
        setResivemessage(messageData.recivedData);

        
      } catch (error) {
        console.log(error,"error");
        console.error("Error reciving data fetching data", error);
      }
    }

    fetchData();
   
    
  }, [pathname,session,status]);




  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageid = pathname.split("/")[2];
    const useremailsend =await session?.user?.email;
    const userimage =await session?.user?.image;


    const res = await fetch("/api/addchat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        useremail: useremailsend,
        messageid,
        content: messagetext,
        userimage:userimage,
        code:"R+kqTxhpjSk32gt6U3SA9Sj2+pj1OPbhWD7kksLniGc=",
      }),
    });
 
    if (res.ok) {

  

      toast("Message sent successfully", {
        duration: 3000,
        position: "top-right",
           })

          

      setMessageText("");
   
    } else {
      console.log("Error sending message");
    }
  };

  







 


useEffect(() => {
  const localemail=session?.user?.email;
  setlocaluseremail(localemail);

 
  
  
}, [session]);






  const messagesEndRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [resivemessage]);





  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-1 overflow-auto md:p-4 w-full">




{/* show messages */}

<div className="flex flex-col w-full h-full">
      <div
        className="grid gap-4 w-full overflow-y-auto no-scrollbar"
        style={{ maxHeight: '80vh' }} // Control the height of the scrollable area
      >
        {Array.isArray(resivemessage) && resivemessage.length > 0 &&
          resivemessage.map((message: any) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                localemail === message.massegecreateduser ? 'justify-end' : 'justify-start'
              }`}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.userimage ?? "/placeholder-user.jpg"} alt="Avatar" />
                <AvatarFallback>{message.chatId}</AvatarFallback>
              </Avatar>

              <div
                className={`${
                  localemail === message.massegecreateduser
                    ? "bg-blue-500 text-white"
                    : "bg-black text-white"
                } rounded-lg p-4 max-w-[80%] flex flex-col`}
              >
                <p>{message.content}</p>
                <div className="text-xs text-[#d5d5d5] mt-1">
                  {new Date(message.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        {/* Ref element to scroll to the bottom */}
        <div ref={messagesEndRef} />
      </div>
    </div>
      </div>
    

      <div className="bg-background border-t border-muted px-1 py-2 flex fixed bottom-1 left-0 w-full items-center ">
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
