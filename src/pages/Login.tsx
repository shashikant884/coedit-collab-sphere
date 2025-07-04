
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { MessageSquare, Video, Users, FileText, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (userData: { name: string; email: string }) => {
    // Store user data in localStorage for now
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

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
};

export default Login;
