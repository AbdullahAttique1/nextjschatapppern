import Chatui from "@/components/Chatui";
import ChatApp from "@/components/gptui/Chatuiarea";
import Landingareaha from "@/components/landingarea";


export default  function Home() {


  return (
  <>
  <div className="flex min-h-screen flex-col bg-background">

 <Landingareaha />
 <ChatApp />
 <Chatui />
  </div>

  </>
  );
}
