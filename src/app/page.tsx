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
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

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
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p>Log in to create a chat room. Click the login button to continue.</p>
        <Button variant="default" size="lg" onClick={() => signIn()}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Dialog onOpenChange={(open) => open && handleDialogOpen()}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="bg-primary text-white"
          >
            Create Chat Room
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Chat Room</DialogTitle>
            <DialogDescription className="p-4 bg-gray-50 rounded-md">
      <p>Your generated password:</p>
      <strong className="text-primary block my-2">{password}</strong>
      <button
        onClick={handleCopy}
        className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                placeholder="Enter your name"
                className="col-span-3"
              />
            </div>
          </div>
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
  );
}
