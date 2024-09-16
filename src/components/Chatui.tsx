'use client'
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { socket } from "../socket";

export default function Chatui() {
  const [messagetext, setMessageText] = useState("");
  const [resivemessage, setResivemessage] = useState<any[]>([]);
  // const [useremail, setUseremail] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
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
  
  
 
  
  useEffect(() => {

    async function fetchData() {

      try {
    
        // Fetch user data
        // const userResponse = await fetch("/api/userdata", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ messageid: pathname.split("/")[2] }),
        // });
        // const userData = await userResponse.json();

        // setUseremail(userData.userdata.email);
      

        

        // Fetch messages
        if (status !== 'authenticated') {
          // Wait until the session is fully authenticated
          return;
        }
    
        const useremailsend = session?.user?.email;
        console.log(useremailsend,"useremailsend");
        const messageResponse = await fetch("/api/reciveddata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            useremail: useremailsend,
            messageid: pathname.split("/")[2],
          }),
        });

        if (!messageResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const messageData = await messageResponse.json();

        console.log(messageData,"userdata");
        


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
    console.log(useremailsend,"useremailsend handlesend masg");

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

  


useEffect(() => {
  // Listen for 'chat message' events from the server
  socket.on('chat message', (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
    window.scrollTo(0, document.body.scrollHeight);
  });
  return () => {
    socket.off('chat message');
  };
}, []);




 


const handleSubmit = (e:any) => {
  e.preventDefault();
  if (input) {
    socket.emit('chat message', input);
    setInput(''); // Clear the input field
  }
};



//msg bhajna wala right side 



 




console.log(resivemessage,"messages");

useEffect(() => {
  const localemail=session?.user?.email;
  setlocaluseremail(localemail);
  
}, [session]);




  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-1 overflow-auto p-4 w-full">





      <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
    {/* Status and Transport Information */}
    <div className="mb-4 p-2 bg-white rounded-lg shadow-md">
     
      


    </div>
  
    {/* Messages List */}
    <div className="mb-4 h-64 overflow-y-auto p-2 bg-white rounded-lg shadow-md">
      <ul id="messages" className="space-y-2">
        {messages.map((msg, index) => (
          <li
            key={index}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            {msg}
          </li>
        ))}
      </ul>
    </div>
  
    {/* Input Form */}
    <form id="form" onSubmit={handleSubmit} className="flex space-x-2">
      <input
        id="input"
        placeholder="Type a message..."
        className="flex-grow bg-blue-500 text-white border-2 border-black rounded-lg px-4 py-2 focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
      >
        Send
      </button>
    </form>
  </div>







{/* show messages */}


        <div className="grid gap-4 w-full">
          {Array.isArray(resivemessage) && resivemessage.length > 0 &&
            resivemessage.map((message: any) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  localemail  === message.massegecreateduser ? 'justify-end' : 'justify-start'
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={session?.user?.image ?? "/placeholder-user.jpg"} alt="Avatar" />
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
