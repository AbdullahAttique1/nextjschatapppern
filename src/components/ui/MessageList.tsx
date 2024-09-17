import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageItem from "./MessageItem";


const MessageList = ({ messages, localemail }: any, ref: any) => {
  return (
    <div className="flex-1 overflow-auto p-4 w-full">
      <div className="grid gap-4 w-full overflow-y-auto no-scrollbar" style={{ maxHeight: "80vh" }}>
        {messages.map((message: any) => (
          <MessageItem key={message.id} message={message} localemail={localemail} />
        ))}
        <div ref={ref} />
      </div>
    </div>
  );
};

export default MessageList;
