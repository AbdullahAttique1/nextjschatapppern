import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


interface MessageInputProps {
  setMessageText: (text: any) => void;
}

const MessageInput = ({ setMessageText }: MessageInputProps) => {
  const [messagetext, setMessagetext] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement send message logic
    setMessageText(messagetext);
    setMessagetext("");
  };

  return (
    <div className="bg-background border-t border-muted px-4 py-2 flex items-center gap-2">
      <form className="w-full relative" onSubmit={handleSendMessage}>
        <Textarea
          value={messagetext}
          onChange={(e) => setMessagetext(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-lg pr-12 w-full"
          rows={1}
        />
        <Button type="submit" variant="ghost" size="icon" className="absolute top-2 right-4 bg-black text-white">
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;

 const SendIcon = (props: any) => {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    );
  };
  
