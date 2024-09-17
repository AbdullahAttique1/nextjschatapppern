"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import generateRandomId from "@/lib/Randomfun";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState<string | any>(undefined);
  const router = useRouter();

  // Generate password when the dialog is opened
  const handleDialogOpen = () => {
    const passwordgen = generateRandomId(20);
    setPassword(passwordgen);
  };

  const CreateChatInstance = async () => {
    const randomId = generateRandomId(10); // Generates a random ID of 10 characters
    handleCopy()
    try {
      const res = await fetch("/api/chatroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail: session?.user?.email,
          randomid: randomId,
          code: "R+kqTxhpjSk32gt6U3SA9Sj2+pj1OPbhWD7kksLniGc=",
          password: password, // Use the password generated when the dialog was opened
        }),
      });

      if (res.ok) {
        router.push(`/Chatroom/${randomId}`);
      } else {
        alert("Error creating chat room");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };




  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  if (!session?.user?.email) {
    return (
<>









<section className="relative h-screen bg-hero-pattern bg-cover bg-center flex items-center justify-center ">
    <div className="absolute inset-0  opacity-50"></div> {/* Overlay */}
    <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Instant Messaging, Seamlessly</h1>
        <p className="text-lg md:text-2xl mb-8">Connect with friends and colleagues anytime, anywhere.</p>
        <Button className="px-8 py-6 bg-blue-500 hover:bg-blue-600 rounded-full text-white" variant="default" size="lg" onClick={() => signIn()}>
      Sign UP/IN
        </Button>
    </div>
</section>

 </>

    );
  }

  return (
    <>
   
<section className="relative h-screen bg-hero-pattern bg-cover bg-center flex items-center justify-center ">
    <div className="absolute inset-0  opacity-50"></div> {/* Overlay */}
    <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Instant Messaging, Seamlessly</h1>
        <p className="text-lg md:text-2xl mb-8">Connect with friends and colleagues anytime, anywhere.</p>
      <Dialog onOpenChange={(open) => open && handleDialogOpen()}>
        <DialogTrigger asChild>
          <Button
          className="px-8 py-6 bg-blue-500 hover:bg-blue-600 rounded-full text-white" variant="default" size="lg"
            >
            Create Chat Room
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Chat Room make sure to copy password</DialogTitle>
            <DialogDescription className="p-4 bg-gray-50 rounded-md">
      <p className="bg-white text-red-600 text-base md:text-2xl font-bold">Your generated password:</p>
      <strong className="text-primary block my-2">{password}</strong>
      <button
        onClick={handleCopy}
        className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button
              variant="default"
              size="lg"
              className="bg-primary text-white"

              
              onClick={CreateChatInstance}
              >
              Create Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
      </section>

              </>
  );
}
