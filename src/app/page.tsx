"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import generateRandomId from "@/lib/Randomfun";




export default  function Home() {








  const { data: session } = useSession();
  

  


const router = useRouter();

const CreateChatinstance=async()=>{



  // const eandomid

  // randomid include english small and larg ealphabet and math numbers

 
  
  const randomId = generateRandomId(10); // Generates a random ID of 10 characters
 
  




const res=await fetch("/api/chatroom",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
  useremail:session?.user?.email,
randomid:randomId,
})
})

console.log(res);


if( res.ok ){ 

  router.push(`/Chatroom/${randomId}`)
}
else{
  alert("Error creating chat room") }
     
}



if(!session?.user?.email){
return<>

<div className="flex min-h-screen flex-col items-center justify-center bg-background">

Log in to create a chat room Login button on Top you have to login to create a chat room
 
  </div>

</>

}

  return (
  <>
  <div className="flex min-h-screen flex-col items-center justify-center bg-background">


<Button variant={"default"} size={"lg"} className={"bg-primary text-white"} onClick={CreateChatinstance}>
  Create  Chatt

</Button>
 
  </div>

  </>
  );
}
