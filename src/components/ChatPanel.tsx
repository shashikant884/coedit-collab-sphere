
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUp, X, Users } from 'lucide-react';

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
      content: 'Hey everyone! Ready to start our collaboration session?',
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: 2,
      sender: 'Bob Smith',
      content: 'Yes! I can see everyone is online. Let\'s begin!',
      timestamp: new Date(Date.now() - 180000),
      isOwn: false,
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers] = useState(['Alice Johnson', 'Bob Smith', 'Carol Davis']);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    console.log('Sending message:', newMessage);

    const message: Message = {
      id: Date.now(),
      sender: user?.name || 'You',
      content: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);

    // Simulate responses from other users
    const responseDelay = 1000 + Math.random() * 3000;
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "That's a great point!",
        "I agree with that approach.",
        "Should we discuss this further?",
        "Perfect! That makes sense.",
        "Let me check that section.",
        "Thanks for the clarification!",
        "I'll update my part accordingly.",
        "Good idea! Let's implement that.",
        "Looks good to me 👍",
        "Can you share more details?",
        "I'm working on the related section.",
        "Almost finished with my part."
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
      
      console.log('Received response:', responseMessage);
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

  const getAvatarColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <Card className="h-full flex flex-col bg-white shadow-xl border-l">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b bg-gray-50">
        <div className="flex items-center space-x-3">
          <CardTitle className="text-lg font-semibold">Team Chat</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Live</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Users className="h-3 w-3" />
              <span className="text-xs">{onlineUsers.length + 1}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Online Users */}
        <div className="p-3 border-b bg-gray-50/50">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-600">Online:</span>
            <div className="flex -space-x-1">
              {onlineUsers.map((userOnline, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-white">
                  <AvatarFallback className={`text-xs text-white ${getAvatarColor(userOnline)}`}>
                    {getInitials(userOnline)}
                  </AvatarFallback>
                </Avatar>
              ))}
              <Avatar className="h-6 w-6 border-2 border-white">
                <AvatarFallback className="text-xs text-white bg-gray-600">
                  {getInitials(user?.name || 'You')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[85%] ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={`text-xs text-white ${
                      message.isOwn ? 'bg-blue-600' : getAvatarColor(message.sender)
                    }`}>
                      {getInitials(message.sender)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                      message.isOwn 
                        ? 'bg-blue-600 text-white rounded-br-md' 
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 px-2">
                      {message.isOwn ? 'You' : message.sender} • {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-gray-400 text-white text-xs">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
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
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4 bg-white">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 border-gray-200 focus:bg-white"
              maxLength={1000}
            />
            <Button 
              type="submit" 
              size="sm" 
              disabled={!newMessage.trim()}
              className="px-3 bg-blue-600 hover:bg-blue-700"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              Press Enter to send • Shift+Enter for new line
            </span>
            <span className="text-xs text-gray-500">
              {newMessage.length}/1000
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;
