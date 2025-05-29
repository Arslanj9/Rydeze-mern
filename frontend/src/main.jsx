import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { PublishProvider } from './context/PublishContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PublishProvider>
        <ProfileProvider>
            <App />
        </ProfileProvider>
      </PublishProvider>
    </AuthProvider>
  </BrowserRouter>
);
