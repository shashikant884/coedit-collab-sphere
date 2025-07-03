
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Video, VideoOff, Mic, MicOff, Phone, Users, MessageSquare, Share } from 'lucide-react';
import ChatPanel from '@/components/ChatPanel';

interface VideoMeetingProps {
  user: { name: string; email: string } | null;
  onBack: () => void;
}

const VideoMeeting = ({ user, onBack }: VideoMeetingProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const participants = [
    { name: 'Alice Johnson', avatar: 'AJ', isSpeaking: true, isMuted: false, isVideoOff: false },
    { name: 'Bob Smith', avatar: 'BS', isSpeaking: false, isMuted: false, isVideoOff: false },
    { name: 'Carol Davis', avatar: 'CD', isSpeaking: false, isMuted: true, isVideoOff: true },
    { name: user?.name || 'You', avatar: user?.name.charAt(0) || 'Y', isSpeaking: false, isMuted, isVideoOff },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Main Video Area */}
      <div className={`flex-1 ${showChat ? 'mr-80' : ''} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-gray-800 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-white hover:bg-gray-700">
                ← Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold">Team Meeting</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-700">
                <Share className="h-4 w-4 mr-2" />
                Share Screen
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowChat(!showChat)}
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>
        </header>

        {/* Video Grid */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 gap-4 h-full max-h-[calc(100vh-200px)]">
            {participants.map((participant, index) => (
              <Card key={index} className="relative bg-gray-800 border-gray-700 overflow-hidden">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  {participant.isVideoOff ? (
                    <div className="flex flex-col items-center justify-center h-full text-white">
                      <Avatar className="h-20 w-20 mb-4">
                        <AvatarFallback className="bg-blue-600 text-white text-2xl">
                          {participant.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-lg font-medium">{participant.name}</p>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Avatar className="h-16 w-16 mx-auto mb-3">
                          <AvatarFallback className="bg-white/20 text-white text-xl">
                            {participant.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium">Video Preview</p>
                        <p className="text-sm opacity-75">{participant.name}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Participant Controls Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                      {participant.name}
                    </span>
                    {participant.isMuted && (
                      <div className="bg-red-500 p-1 rounded">
                        <MicOff className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Speaking Indicator */}
                  {participant.isSpeaking && (
                    <div className="absolute inset-0 border-4 border-green-500 rounded-lg pointer-events-none"></div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Meeting Controls */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-gray-800 rounded-full px-6 py-4 flex items-center space-x-4 shadow-lg">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-full"
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="lg"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className="rounded-full"
            >
              {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              onClick={onBack}
              className="rounded-full"
            >
              <Phone className="h-5 w-5" />
            </Button>
            
            <div className="text-white px-3 py-2 bg-gray-700 rounded-full text-sm">
              <Users className="h-4 w-4 inline mr-2" />
              {participants.length}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed right-0 top-0 w-80 h-full">
          <ChatPanel user={user} onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
};

export default VideoMeeting;
