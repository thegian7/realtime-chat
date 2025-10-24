import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import { AuthForm } from './components/AuthForm';
import { ChatRoom } from './components/ChatRoom';

function App() {
  const { isAuthenticated, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return isAuthenticated ? <ChatRoom /> : <AuthForm />;
}

export default App;
