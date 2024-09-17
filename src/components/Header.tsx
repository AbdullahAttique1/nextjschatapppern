"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet"; // Assuming you have a Sheet component in your UI library
import { Menu } from "lucide-react"; // Icon for the hamburger menu

interface User {
  name: string;
  email: string;
  userId: string;
  profileImage: string;
}

export default function Header() {
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
    <div className="flex flex-col bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <h1 className="text-base md:text-2xl font-bold">Chat App</h1>
          </Link>
          
          {/* Mobile View: Hamburger Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-4">
                {user ? (
                  <div className="flex flex-col items-start gap-4">
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
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop View: User Information and Sign-Out Button */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
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
        </div>
      </header>
      <main></main>
    </div>
  );
}
