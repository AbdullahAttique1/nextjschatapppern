"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

import { signIn, signOut, useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";



interface User {
  name: string;
  email: string;
  userId: string;
  profileImage: string;
}



export default function LandingArea() {

  const [user, setUser] = useState<User | null>(null);



  const { data: session } = useSession();


  useEffect(() => {
    if (session?.user) {
      const newUser: User = {
        name: session.user.name || "",
        email: session.user.email || "",
        userId: session.user.id || "",
        profileImage: session.user.image || "",
      };
      setUser(newUser);
    } else {
      setUser(null);
    }
  }, [session]);

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };



 

 







  return (
    <div className="flex  flex-col bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Chat App</h1>
          {user ? (
            <div className="flex items-center gap-4">
              {session?.user?.id}
              {session?.user?.email}
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user.profileImage ?? "https://source.boringavatars.com/marble/120"}
                    alt={user.name}
                  />
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" className="text-black" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="text-black" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </div>
      </header>

  

<main>



</main>



    </div>
  );
}
