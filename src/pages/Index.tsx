
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Video, Users, FileText, Zap, Shield } from 'lucide-react';
import AuthForm from '@/components/AuthForm';
import Dashboard from '@/components/Dashboard';
import DocumentEditor from '@/components/DocumentEditor';
import VideoMeeting from '@/components/VideoMeeting';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = (userData: { name: string; email: string }) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              📝 CoEditLive
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time collaboration platform for seamless document editing, chat, and video meetings
            </p>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Real-time Editing</CardTitle>
                <CardDescription>
                  Collaborate on documents simultaneously with live cursor tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>
                  Instant messaging integrated with your collaborative workspace
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Video className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Video Meetings</CardTitle>
                <CardDescription>
                  Host and join video conferences directly from your documents
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Auth Form */}
          <div className="max-w-md mx-auto">
            <AuthForm onLogin={handleLogin} />
          </div>

          {/* Additional Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-gray-600">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>Lightning-fast performance</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Unlimited collaborators</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'dashboard' && (
        <Dashboard 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
      )}
      {currentView === 'editor' && (
        <DocumentEditor 
          user={currentUser}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'video' && (
        <VideoMeeting 
          user={currentUser}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
    </div>
  );
};

export default Index;
