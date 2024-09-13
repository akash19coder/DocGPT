import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import axios from 'axios';

axios.defaults.baseURL = 'https://docgpt-1-0-1.onrender.com';
axios.defaults.withCredentials = true;

import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ChatProvider } from './contexts/ChatContext.tsx';
import { NavbarProvider } from './contexts/NavbarContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatProvider>
        <NavbarProvider>
          <Router>
            <Toaster />
            <App />
          </Router>
        </NavbarProvider>
      </ChatProvider>
    </AuthProvider>
  </React.StrictMode>,
)
