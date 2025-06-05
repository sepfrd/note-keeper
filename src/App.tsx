import GlobalToast from '@/components/GlobalToast';
import Login from '@/pages/Login';
import { ToastProvider } from '@/providers/ToastProvider';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import NavBar from '@/components/NavBar';
import { AuthProvider } from '@/providers/AuthProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ToastProvider>
          <GlobalToast />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
