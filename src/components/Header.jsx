// src/components/Header.jsx
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { Menu, X } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import SlidingPanel from './SlidingPanel';
import { useSelector } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const popoverRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authentication = useSelector((state) => state.authentication);
  console.log('Authenticated User:', authentication.user);
  const [profilePanelOpen, setProfilePanelOpen] = useState(false);

  const convertItems = [
    { label: 'Video to MP3', href: '/videoToAudio' },
    { label: 'MP3 Volume Enhance', href: '/volumeEnhancer' },
    { label: 'MP3 Noise Clearance', href: '/noiseClear' },
    { label: 'Video to Noise-Free MP3', href: '/videoToNoiseClear' },
  ];

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/onboarding');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const handleConvertOption = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const getGooglePhoto = (url) => {
    if (!url) return null;
    return url.includes('=s') ? url : `${url}=s128-c`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4 relative overflow-visible">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3 relative">
            <span
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-indigo-700 transition cursor-pointer select-none"
            >
              Home
            </span>

            <div className="relative" ref={popoverRef}>
              <DropdownMenu
                label="Convert"
                items={convertItems.map((item) => ({
                  ...item,
                  onClick: () => handleConvertOption(item.href),
                }))}
              />
            </div>

            <span
              onClick={() => setProfilePanelOpen(true)}
              className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-blue-600 transition cursor-pointer select-none"
            >
              Profile
            </span>

            <span
              onClick={handleLogout}
              className="ml-2 px-5 py-2 rounded-lg font-semibold text-gray-700 border border-gray-200 hover:text-indigo-700 hover:bg-gray-100 transition cursor-pointer select-none"
            >
              Logout
            </span>

            {/* 👇 User Avatar with Gradient Border + Shadow */}
            <div
              onClick={() => setProfilePanelOpen(true)}
              className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg cursor-pointer"
            >
              <img
                src={
                  getGooglePhoto(authentication.user?.photoURL) ||
                  `https://ui-avatars.com/api/?name=${
                    authentication.user?.displayName ||
                    authentication.user?.name ||
                    'Guest'
                  }&background=4f46e5&color=fff`
                }
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gradient-to-tr from-indigo-100 via-purple-100 to-emerald-100 hover:from-indigo-200 hover:via-purple-200 hover:to-emerald-200 text-gray-700 focus:outline-none shadow-md transition-all duration-300"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full right-0 w-64 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col p-4 gap-2 z-50">
              <span
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer select-none"
              >
                Home
              </span>

              {convertItems.map((item) => (
                <span
                  key={item.href}
                  onClick={() => handleConvertOption(item.href)}
                  className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer select-none"
                >
                  {item.label}
                </span>
              ))}

              <span
                onClick={() => setProfilePanelOpen(true)}
                className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer select-none"
              >
                Profile
              </span>

              <span
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg font-semibold text-gray-700 border border-gray-200 hover:text-indigo-700 hover:bg-gray-100 cursor-pointer select-none"
              >
                Logout
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Sliding Panel - Moved outside header */}
      <SlidingPanel
        open={profilePanelOpen}
        onClose={() => setProfilePanelOpen(false)}
        title="Profile"
      >
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-gray-700">
            User:{' '}
            {authentication.user?.displayName ||
              authentication.user?.name ||
              'Guest'}
          </p>
          <p className="text-gray-500">Email: {authentication.user?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Logout
          </button>
        </div>
      </SlidingPanel>
    </>
  );
}
