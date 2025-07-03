
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowUp, MessageSquare, Users, Share, Save, FileText } from 'lucide-react';
import ChatPanel from '@/components/ChatPanel';

interface DocumentEditorProps {
  user: { name: string; email: string } | null;
  onBack: () => void;
}

const DocumentEditor = ({ user, onBack }: DocumentEditorProps) => {
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [documentContent, setDocumentContent] = useState('Start typing your document here...');
  const [showChat, setShowChat] = useState(true);

  const collaborators = [
    { name: 'Alice Johnson', avatar: 'AJ', color: 'bg-blue-500', active: true },
    { name: 'Bob Smith', avatar: 'BS', color: 'bg-green-500', active: true },
    { name: 'Carol Davis', avatar: 'CD', color: 'bg-purple-500', active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Editor */}
      <div className={`flex-1 ${showChat ? 'mr-80' : ''} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <Input 
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                className="text-lg font-semibold border-none shadow-none focus:ring-0 px-0"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Active Collaborators */}
              <div className="flex items-center space-x-2">
                {collaborators.map((collaborator, index) => (
                  <div key={index} className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={`${collaborator.color} text-white text-xs`}>
                        {collaborator.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {collaborator.active && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>

              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>
        </header>

        {/* Editor Content */}
        <div className="p-8">
          <Card className="max-w-4xl mx-auto min-h-[600px]">
            <CardContent className="p-8">
              <Textarea
                value={documentContent}
                onChange={(e) => setDocumentContent(e.target.value)}
                className="w-full min-h-[500px] border-none resize-none focus:ring-0 text-base leading-relaxed"
                placeholder="Start writing your document..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Document Stats */}
        <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{documentContent.split(' ').length} words</span>
            <span>{documentContent.length} characters</span>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {collaborators.filter(c => c.active).length} online
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

export default DocumentEditor;
