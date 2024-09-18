'use client';

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput ";


export default function ChatUIS() {
  const [resivemessage, setResivemessage] = useState<any[]>([]);
  const [localemail, setlocaluseremail] = useState<string | null | undefined>(null);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Ensure user is logged in
  useEffect(() => {
    async function logUser() {
      if (status === "loading") return;
      if (!session?.user?.email) {
        router.push("/");
      }
    }
    logUser();
  }, [session, status, router]);

  // Fetch initial messages
  useEffect(() => {
    async function fetchData() {
      try {
        if (status !== "authenticated") return;
        const useremail = session?.user?.email;
        const messageResponse = await fetch("/api/reciveddata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            useremail,
            messageid: pathname.split("/")[2],
            code: process.env.NEXT_PUBLIC_SECRET_CODE
          }),
        });

        if (!messageResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const messageData = await messageResponse.json();
        setResivemessage(messageData.recivedData);
      } catch (error) {
        console.error("Error receiving data", error);
      }
    }
    fetchData();
  }, [pathname, session, status]);

  // Scroll to the last message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resivemessage]);



  return (
    <div className="flex flex-col h-screen w-full">
      <MessageList messages={resivemessage} localemail={localemail} ref={messagesEndRef} />
      <MessageInput setMessageText={setResivemessage} />
    </div>
  );
}
