import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './pages/authentication/Login';
import SignUp from './pages/authentication/SignUp';
import Onboarding from './pages/onboarding/Onboarding';
import Dashboard from './pages/dashboard/Dashboard';
import VideoToAudio from './pages/filesConversion/VideoToAudio';
import VolumeEnhancer from './pages/filesConversion/VolumeEnhancer';
import NoiseClear from './pages/filesConversion/NoiseClear';
import VideoToNoiseFreeMP3 from './pages/filesConversion/VideoToNoiseFreeMP3';

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return null; // or a loading spinner if you want
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/videoToAudio" element={<VideoToAudio />} />
        <Route path="/volumeEnhancer" element={<VolumeEnhancer />} />
        <Route path="/noiseClear" element={<NoiseClear />} />
        <Route path="/videoToNoiseClear" element={<VideoToNoiseFreeMP3 />} />
      </Routes>
    </Router>
  );
};

export default App;
