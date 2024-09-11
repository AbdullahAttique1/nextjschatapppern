"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



export default  function Home() {

const router = useRouter();

const CreateChatinstance=async()=>{



  // const eandomid

 router.push("/Chatroom/cm0kthwwg000011nhwg9xsi8j")
   
   
   
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
