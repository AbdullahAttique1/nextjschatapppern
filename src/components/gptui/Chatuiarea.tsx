"use client"
import React, { useState } from 'react';

const contacts = [
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/300?img=1', message: 'Hey, how are you?', online: true },
  { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/300?img=2', message: 'What’s up?', online: false },
  { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/300?img=3', message: 'Let’s catch up soon!', online: true },
];

const initialMessages = [
  { id: 1, type: 'received', content: 'Hey, how are you?', timestamp: '10:30 AM' },
  { id: 2, type: 'sent', content: 'I’m good! How about you?', timestamp: '10:32 AM' },
];

const ChatApp = () => {
  const [currentChat, setCurrentChat] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        type: 'sent',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen flex">
   


      {/* Chat Section */}
      <div className="w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center bg-white px-6 py-4 border-b border-gray-300">
          <img src={currentChat.avatar} alt={currentChat.name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="font-medium text-gray-900">{currentChat.name}</p>
            <p className={`text-sm ${currentChat.online ? 'text-green-500' : 'text-gray-500'}`}>
              {currentChat.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs rounded-lg p-3 ${message.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p>{message.content}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-4 bg-white border-t border-gray-300 flex items-center">
          <textarea
            className="flex-1 resize-none border border-gray-300 rounded-lg p-2 focus:outline-none"
                  
            rows={1}
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
