import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg
        className="w-10 h-10 text-indigo-500 animate-bounce"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
      </svg>
    ),
    title: 'Video to Audio',
    desc: 'Convert your videos into high-quality MP3 audio files instantly.',
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-emerald-500 animate-pulse"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M9 19V6h6v13m-6 0a2 2 0 01-2-2V8a2 2 0 012-2m6 13a2 2 0 002-2V8a2 2 0 00-2-2" />
      </svg>
    ),
    title: 'MP3 Volume Enhance',
    desc: 'Boost the volume of your MP3 files without losing quality.',
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-blue-500 animate-spin-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M9 19V6h6v13m-6 0a2 2 0 01-2-2V8a2 2 0 012-2m6 13a2 2 0 002-2V8a2 2 0 00-2-2" />
      </svg>
    ),
    title: 'MP3 Noise Clearance',
    desc: 'Remove background noise from your audio for crystal-clear sound.',
  },
];

// Custom animation for slow spin
const style = `
@keyframes spin-slow {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
.animate-spin-slow {
  animation: spin-slow 4s linear infinite;
}
`;

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <>
      <style>{style}</style>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa] relative overflow-hidden">
        {/* Animated Gradient Blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-tr from-indigo-400 via-purple-300 to-emerald-200 rounded-full filter blur-3xl opacity-60 animate-pulse z-0" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-gradient-to-br from-blue-300 via-indigo-200 to-emerald-100 rounded-full filter blur-3xl opacity-50 animate-blob z-0" />
        <div className="relative z-10 w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl px-0 py-0 md:p-0 flex flex-col md:flex-row overflow-hidden">
            {/* Left: Illustration & Welcome */}
            <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-10 md:p-14">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight animate-fade-in-down text-center">
                Welcome to <span className="text-indigo-600">SoundMint</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium animate-fade-in-up text-center mb-8">
                Effortless file conversion and audio enhancement at your
                fingertips.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-4 w-full">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-xl shadow transition duration-200 animate-fade-in"
                  style={{ animationDelay: '0.5s' }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-white font-semibold py-3 px-8 rounded-xl shadow transition duration-200 animate-fade-in"
                  style={{ animationDelay: '0.6s' }}
                >
                  Sign Up
                </button>
              </div>
              <div
                className="mt-6 text-center text-gray-400 text-xs animate-fade-in"
                style={{ animationDelay: '0.7s' }}
              >
                By continuing, you agree to our{' '}
                <span className="underline cursor-pointer hover:text-indigo-600">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="underline cursor-pointer hover:text-indigo-600">
                  Privacy Policy
                </span>
                .
              </div>
            </div>
            {/* Right: Features */}
            <div className="flex-1 bg-white flex flex-col justify-center p-8 md:p-12">
              <div className="grid grid-cols-1 gap-6">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 bg-gradient-to-r from-white via-indigo-50 to-emerald-50 rounded-xl p-5 shadow group animate-fade-in"
                    style={{
                      animationDelay: `${i * 0.1 + 0.2}s`,
                    }}
                  >
                    <div>{f.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition">
                        {f.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
        `}
      </style>
    </>
  );
}
