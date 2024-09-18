'use client'
import React, { useEffect, useState } from 'react';
import Chatui from '@/components/Chatui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from "ably/react";

// Adjust imports based on ShadCN components

const client = new Ably.Realtime ({ authUrl: '/token', authMethod: 'POST' });

const Page = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [correctPassword, setCorrectPassword] = useState(''); // Store the correct password

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function logUser() {
      if (status === 'loading') return;
      if (!session?.user?.email) router.push('/');
    }
    logUser();
  }, [session, status, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (status !== 'authenticated') return;

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
        setCorrectPassword(messageData.recivedData[0].password);

        // Check if there's a password stored in localStorage
        const storedPassword = localStorage.getItem('userPassword');
        if (storedPassword === messageData.recivedData[0].password) {
          setIsAuthenticated(true); // Auto-authenticate if stored password matches
        }

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
      localStorage.setItem('userPassword', password); // Store the password in localStorage
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <>
      <AblyProvider client={client}>
        <ChannelProvider channelName="status-updates">
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
        </ChannelProvider>
      </AblyProvider>
    </>
  );
};

export default Page;
