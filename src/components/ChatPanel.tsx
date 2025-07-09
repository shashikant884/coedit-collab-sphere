
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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      sender: user?.name || 'You',
      content: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate response from another user with more variety
    const responseDelay = 1500 + Math.random() * 2000;
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "Great point!",
        "I agree with that approach.",
        "Should we add more details here?",
        "Perfect! That clarifies things.",
        "Let me check that section.",
        "Thanks for the update!",
        "I'll make those changes now.",
        "Good catch! Fixed it.",
        "Looks good to me 👍",
        "Can you elaborate on that?",
        "I'm working on the next part.",
        "Almost done with my section."
      ];
      
      const senders = ['Alice Johnson', 'Bob Smith', 'Carol Davis'];
      const randomSender = senders[Math.floor(Math.random() * senders.length)];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: Date.now() + 1,
        sender: randomSender,
        content: randomResponse,
        timestamp: new Date(),
        isOwn: false,
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, responseDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="h-full flex flex-col bg-white shadow-lg">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg">Team Chat</CardTitle>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">Online</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-200px)]">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className={`text-xs ${
                    message.isOwn 
                      ? 'bg-blue-600 text-white' 
                      : message.sender === 'Alice Johnson' 
                        ? 'bg-purple-500 text-white'
                        : message.sender === 'Bob Smith'
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-500 text-white'
                  }`}>
                    {getInitials(message.sender)}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3 py-2 rounded-lg max-w-xs break-words ${
                    message.isOwn 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-1">
                    {message.isOwn ? 'You' : message.sender} • {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-gray-400 text-white text-xs">
                    ...
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 px-3 py-2 rounded-lg rounded-bl-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4 bg-gray-50">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-white"
              maxLength={500}
            />
            <Button 
              type="submit" 
              size="sm" 
              disabled={!newMessage.trim()}
              className="px-3"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </span>
            <span className="text-xs text-gray-500">
              {newMessage.length}/500
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;
