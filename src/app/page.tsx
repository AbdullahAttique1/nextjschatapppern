"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";



export default  function Home() {
  const { data: session } = useSession();
  

  
const userid=session?.user?.id

console.log(userid,"akhd");

const router = useRouter();

const CreateChatinstance=async()=>{



  // const eandomid

  // randomid include english small and larg ealphabet and math numbers

  function generateRandomId(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters[randomIndex];
    }
  
    return randomId;
  }
  
  const randomId = generateRandomId(10); // Generates a random ID of 10 characters
 
  




const res=await fetch("/api/chatroom",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userid:userid,
randomid:randomId,
users:userid,
})
})

console.log(res);


if( res.ok ){ 

  router.push(`/Chatroom/${randomId}`)
}
else{
  alert("Error creating chat room") }
     
}

  return (
  <>
  <div className="flex min-h-screen flex-col items-center justify-center bg-background">
{session?.user?.id}
{session?.user?.email}
{session?.user?.name}
{/* <img src={session?.user?.image} alt="profile image" /> */}

<Button variant={"default"} size={"lg"} className={"bg-primary text-white"} onClick={CreateChatinstance}>
  Create  Chatt

</Button>
 
  </div>

  </>
  );
}
