
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowUp, X } from 'lucide-react';

interface ChatPanelProps {
  user: { name: string; email: string } | null;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

const ChatPanel = ({ user, onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Alice Johnson',
      content: 'Hey everyone! Ready to work on this document?',
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: 2,
      sender: 'Bob Smith',
      content: 'Yes! I just added some notes to the introduction.',
      timestamp: new Date(Date.now() - 180000),
      isOwn: false,
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: user?.name || 'You',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate response from another user
    setTimeout(() => {
      const responses = [
        "Great point!",
        "I agree with that approach.",
        "Should we add more details here?",
        "Perfect! That clarifies things.",
        "Let me check that section."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMessage: Message = {
        id: messages.length + 2,
        sender: 'Alice Johnson',
        content: randomResponse,
        timestamp: new Date(),
        isOwn: false,
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full flex flex-col bg-white shadow-lg">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="text-lg">Team Chat</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className={`text-xs ${message.isOwn ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                    {message.sender.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3 py-2 rounded-lg ${message.isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {message.isOwn ? 'You' : message.sender} • {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="sm" disabled={!newMessage.trim()}>
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;
