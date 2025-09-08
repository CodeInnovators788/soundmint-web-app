// src/components/Header.jsx
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/onboarding');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <header className="relative z-10 w-full bg-white/90 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo + Name */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100">
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </span>
          <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">
            SoundMint
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 md:gap-3">
          <span
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-transparent hover:bg-indigo-50 hover:text-indigo-700 transition cursor-pointer select-none"
          >
            Home
          </span>
          <span
            onClick={() => navigate('/dashboard?tab=convert')}
            className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-transparent hover:bg-indigo-50 hover:text-indigo-700 transition cursor-pointer select-none"
          >
            Convert
          </span>
          <span
            onClick={() => navigate('/dashboard?tab=enhance')}
            className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-transparent hover:bg-emerald-50 hover:text-emerald-600 transition cursor-pointer select-none"
          >
            Enhance
          </span>
          <span
            onClick={() => navigate('/dashboard?tab=profile')}
            className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-transparent hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer select-none"
          >
            Profile
          </span>
          <span
            onClick={handleLogout}
            className="ml-2 px-5 py-2 rounded-lg font-semibold text-gray-700 bg-transparent border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 transition cursor-pointer select-none"
          >
            Logout
          </span>
        </nav>
      </div>
    </header>
  );
}
