
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '@/components/Dashboard';
import DocumentEditor from '@/components/DocumentEditor';
import VideoMeeting from '@/components/VideoMeeting';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for authentication
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
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
