'use client'
import React, { useEffect, useState } from 'react';
import Chatui from '@/components/Chatui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Adjust imports based on ShadCN components

const Page = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [correctPassword, setCorrectPassword] = useState(''); // Store the correct password

  const { data: session, status } = useSession(); // Destructure status
  const pathname = usePathname();
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
        // Fetch messages
        if (status !== 'authenticated') {
          // Wait until the session is fully authenticated
          return;
        }

        const messageResponse = await fetch("/api/getpass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            messageid: pathname.split("/")[2],
            code: "R+kqTxhpjSk32gt6U3SA9Sj2+pj1OPbhWD7kksLniGc=",
          }),
        });

        if (!messageResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const messageData = await messageResponse.json();
      

        // Set the correct password
        setCorrectPassword(messageData.recivedData[0].password);
        
      } catch (error) {
        console.log(error, "error");
        console.error("Error receiving data fetching data", error);
      }
    }

    fetchData();
  }, [pathname, session, status]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {!isAuthenticated ? (
        <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Enter Password</h2>
          {error && <Alert className="mb-4">{error}</Alert>}
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <Chatui />
      )}
    </div>
  );
};

export default Page;
