import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MessageItemProps {
  message: any;
  localemail: string | null | undefined;
}

const MessageItem = ({ message, localemail }: MessageItemProps) => {
  return (
    <div className={`flex items-start gap-4 ${localemail === message.massegecreateduser ? "justify-end" : "justify-start"}`}>
      <Avatar className="w-8 h-8">
        <AvatarImage src={message.userimage ?? "/placeholder-user.jpg"} alt="Avatar" />
        <AvatarFallback>{message.chatId}</AvatarFallback>
      </Avatar>
      <div
        className={`${
          localemail === message.massegecreateduser ? "bg-blue-500 text-white" : "bg-black text-white"
        } rounded-lg p-4 max-w-[80%] flex flex-col`}
      >
        <p>{message.content}</p>
        <div className="text-xs text-[#d5d5d5] mt-1">{new Date(message.createdAt).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default MessageItem;
