import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa] relative overflow-hidden">
        {/* Animated Gradient Blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-tr from-indigo-400 via-purple-300 to-emerald-200 rounded-full filter blur-3xl opacity-60 animate-pulse z-0" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-gradient-to-br from-blue-300 via-indigo-200 to-emerald-100 rounded-full filter blur-3xl opacity-50 animate-blob z-0" />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 md:p-16 mt-10 mb-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              {/* Left: Welcome & Info */}
              <div className="flex-1 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight animate-fade-in-down">
                  Welcome to your{' '}
                  <span className="text-indigo-600">Dashboard</span>
                </h1>
                <p className="text-lg text-gray-500 font-medium animate-fade-in-up mb-6">
                  Start converting and enhancing your files with SoundMint's
                  powerful tools.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
                      </svg>
                    </span>
                    <span className="text-gray-700 font-semibold">
                      Video to Audio Conversion
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
                      <svg
                        className="w-6 h-6 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 19V6h6v13m-6 0a2 2 0 01-2-2V8a2 2 0 012-2m6 13a2 2 0 002-2V8a2 2 0 00-2-2" />
                      </svg>
                    </span>
                    <span className="text-gray-700 font-semibold">
                      MP3 Volume Enhancement
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                      <svg
                        className="w-6 h-6 text-blue-600 animate-spin-slow"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path d="M9 19V6h6v13m-6 0a2 2 0 01-2-2V8a2 2 0 012-2m6 13a2 2 0 002-2V8a2 2 0 00-2-2" />
                      </svg>
                    </span>
                    <span className="text-gray-700 font-semibold">
                      MP3 Noise Clearance
                    </span>
                  </li>
                </ul>
              </div>
              {/* Right: Actions */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="bg-gradient-to-br from-white via-indigo-50 to-emerald-50 rounded-2xl p-8 shadow-lg flex flex-col items-center animate-fade-in">
                  <svg
                    className="w-12 h-12 text-indigo-500 mb-3 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Video to Audio
                  </h3>
                  <p className="text-gray-500 text-sm text-center mb-4">
                    Convert your videos into high-quality MP3 audio files
                    instantly.
                  </p>
                  <button
                    onClick={() => navigate('/videoToAudio')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-8 rounded-lg shadow transition"
                  >
                    Convert Now
                  </button>
                </div>
                <div
                  className="bg-gradient-to-br from-white via-indigo-50 to-emerald-50 rounded-2xl p-8 shadow-lg flex flex-col items-center animate-fade-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  <svg
                    className="w-12 h-12 text-emerald-500 mb-3 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 19V6h6v13m-6 0a2 2 0 01-2-2V8a2 2 0 012-2m6 13a2 2 0 002-2V8a2 2 0 00-2-2" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    MP3 Volume Enhance
                  </h3>
                  <p className="text-gray-500 text-sm text-center mb-4">
                    Boost the volume of your MP3 files without losing quality.
                  </p>
                  <button
                    onClick={() => navigate('/volumeEnhancer')}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-8 rounded-lg shadow transition"
                  >
                    Enhance Volume
                  </button>
                </div>
                <div
                  className="bg-gradient-to-br from-white via-indigo-50 to-emerald-50 rounded-2xl p-8 shadow-lg flex flex-col items-center animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  <svg
                    className="w-12 h-12 text-blue-500 mb-3 animate-spin-slow"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M9 19V6h6v13m-6 0a2 2 0 01-2-2V8a2 2 0 012-2m6 13a2 2 0 002-2V8a2 2 0 00-2-2" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    MP3 Noise Clearance
                  </h3>
                  <p className="text-gray-500 text-sm text-center mb-4">
                    Remove background noise from your audio for crystal-clear
                    sound.
                  </p>
                  <button
                    onClick={() => navigate('/noiseClear')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg shadow transition"
                  >
                    Clear Noise
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center text-gray-400 text-xs animate-fade-in mt-10">
              Your files are processed securely and privately.
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
      {/* Animations */}
      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.8s both;
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.9s both;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.9s both;
        }
        @keyframes blob {
          0%, 100% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.1) translateY(20px);}
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        `}
      </style>
    </>
  );
}
