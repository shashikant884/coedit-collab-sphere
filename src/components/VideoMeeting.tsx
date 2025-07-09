
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Video, VideoOff, Mic, MicOff, Phone, Users, MessageSquare, Share, Settings, Monitor } from 'lucide-react';
import ChatPanel from '@/components/ChatPanel';

interface VideoMeetingProps {
  user: { name: string; email: string } | null;
  onBack: () => void;
}

interface Participant {
  name: string;
  avatar: string;
  isSpeaking: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  connectionStatus: 'connected' | 'connecting' | 'poor';
}

const VideoMeeting = ({ user, onBack }: VideoMeetingProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [participants, setParticipants] = useState<Participant[]>([
    { name: 'Alice Johnson', avatar: 'AJ', isSpeaking: false, isMuted: false, isVideoOff: false, connectionStatus: 'connected' },
    { name: 'Bob Smith', avatar: 'BS', isSpeaking: true, isMuted: false, isVideoOff: false, connectionStatus: 'connected' },
    { name: 'Carol Davis', avatar: 'CD', isSpeaking: false, isMuted: true, isVideoOff: true, connectionStatus: 'poor' },
    { name: user?.name || 'You', avatar: user?.name?.charAt(0) || 'Y', isSpeaking: false, isMuted, isVideoOff, connectionStatus: 'connected' },
  ]);

  // Meeting timer
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate speaking activity
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants(prev => prev.map(participant => ({
        ...participant,
        isSpeaking: participant.name !== (user?.name || 'You') ? Math.random() > 0.8 : participant.isSpeaking
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [user?.name]);

  // Update user participant when mute/video state changes
  useEffect(() => {
    setParticipants(prev => prev.map(participant => 
      participant.name === (user?.name || 'You') 
        ? { ...participant, isMuted, isVideoOff }
        : participant
    ));
  }, [isMuted, isVideoOff, user?.name]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    console.log('Microphone', !isMuted ? 'muted' : 'unmuted');
  };

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    console.log('Camera', !isVideoOff ? 'turned off' : 'turned on');
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    console.log('Screen sharing', !isScreenSharing ? 'started' : 'stopped');
  };

  const handleEndCall = () => {
    console.log('Meeting ended');
    onBack();
  };

  const getConnectionStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Main Video Area */}
      <div className={`flex-1 ${showChat ? 'mr-80' : ''} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-gray-800 text-white p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-white hover:bg-gray-700">
                ← Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Team Meeting</h1>
                <p className="text-sm text-gray-300">Duration: {formatDuration(meetingDuration)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant={isScreenSharing ? "default" : "outline"} 
                size="sm" 
                onClick={handleScreenShare}
                className={`text-white border-gray-600 ${isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-700'}`}
              >
                {isScreenSharing ? <Monitor className="h-4 w-4 mr-2" /> : <Share className="h-4 w-4 mr-2" />}
                {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
              </Button>
              
              <Button 
                variant={showChat ? "default" : "outline"}
                size="sm"
                onClick={() => setShowChat(!showChat)}
                className={`text-white border-gray-600 ${showChat ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-700'}`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>

              <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </header>

        {/* Video Grid */}
        <div className="flex-1 p-6">
          {isScreenSharing && (
            <div className="mb-4 p-4 bg-blue-900 rounded-lg border-2 border-blue-500">
              <div className="flex items-center justify-center h-40 bg-gradient-to-br from-blue-600 to-blue-800 rounded">
                <div className="text-center text-white">
                  <Monitor className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-semibold">Screen Sharing Active</p>
                  <p className="text-sm opacity-75">Sharing entire screen</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 h-full max-h-[calc(100vh-300px)]">
            {participants.map((participant, index) => (
              <Card key={index} className="relative bg-gray-800 border-gray-700 overflow-hidden">
                <CardContent className="p-0 h-full flex items-center justify-center relative">
                  {/* Connection Status Indicator */}
                  <div className={`absolute top-3 right-3 w-3 h-3 ${getConnectionStatusColor(participant.connectionStatus)} rounded-full z-10`}></div>
                  
                  {participant.isVideoOff ? (
                    <div className="flex flex-col items-center justify-center h-full text-white bg-gradient-to-br from-gray-700 to-gray-800">
                      <Avatar className="h-20 w-20 mb-4">
                        <AvatarFallback className="bg-blue-600 text-white text-2xl">
                          {participant.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-lg font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-400">Camera off</p>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                      <div className="text-center text-white">
                        <Avatar className="h-16 w-16 mx-auto mb-3">
                          <AvatarFallback className="bg-white/20 text-white text-xl">
                            {participant.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium">Video Stream</p>
                        <p className="text-sm opacity-75">{participant.name}</p>
                      </div>
                      
                      {/* Video quality indicator */}
                      <div className="absolute top-3 left-3 bg-black/50 px-2 py-1 rounded text-xs">
                        {participant.connectionStatus === 'connected' ? 'HD' : 
                         participant.connectionStatus === 'poor' ? 'SD' : 'Connecting...'}
                      </div>
                    </div>
                  )}
                  
                  {/* Participant Info Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <span className="text-white text-sm font-medium bg-black/70 px-3 py-1 rounded-full">
                      {participant.name}
                    </span>
                    {participant.isMuted && (
                      <div className="bg-red-500 p-1.5 rounded-full">
                        <MicOff className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Speaking Indicator */}
                  {participant.isSpeaking && !participant.isMuted && (
                    <div className="absolute inset-0 border-4 border-green-400 rounded-lg pointer-events-none animate-pulse"></div>
                  )}

                  {/* Poor connection indicator */}
                  {participant.connectionStatus === 'poor' && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                      Poor Connection
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Meeting Controls */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gray-800 rounded-full px-8 py-4 flex items-center space-x-4 shadow-2xl border border-gray-600">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              onClick={handleToggleMute}
              className="rounded-full w-12 h-12 p-0"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="lg"
              onClick={handleToggleVideo}
              className="rounded-full w-12 h-12 p-0"
              title={isVideoOff ? "Turn on camera" : "Turn off camera"}
            >
              {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              onClick={handleEndCall}
              className="rounded-full w-12 h-12 p-0"
              title="End call"
            >
              <Phone className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2 text-white px-4 py-2 bg-gray-700 rounded-full text-sm">
              <Users className="h-4 w-4" />
              <span>{participants.length}</span>
              <span className="text-gray-300">participants</span>
            </div>

            <div className="text-white px-3 py-2 bg-gray-700 rounded-full text-sm">
              {formatDuration(meetingDuration)}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed right-0 top-0 w-80 h-full z-10">
          <ChatPanel user={user} onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
};

export default VideoMeeting;
