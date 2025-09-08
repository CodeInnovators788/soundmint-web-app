import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleAuthButton from '../../features/authentication/GoogleAuthButton';
import { saveUserToFirestore } from '../../api/firebase/firebase.user.firestore';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setErr('');
      setLoading(true);
      try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', result.user);
        // ✅ Save/update Firestore
        await saveUserToFirestore(result.user);

        navigate('/dashboard');
      } catch (error) {
        setErr(
          error.message
            .replace('Firebase:', '')
            .replace('auth/', '')
            .replace(/-/g, ' ')
        );
      }
      setLoading(false);
    } catch (error) {
      console.error('Unexpected error during login:', error);
      setErr('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa] relative overflow-hidden">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-tr from-indigo-400 via-purple-300 to-emerald-200 rounded-full filter blur-3xl opacity-60 animate-pulse z-0" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-gradient-to-br from-blue-300 via-indigo-200 to-emerald-100 rounded-full filter blur-3xl opacity-50 animate-blob z-0" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-10 md:p-12 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight animate-fade-in-down text-center">
            Login to <span className="text-indigo-600">SoundMint</span>
          </h2>
          <p className="text-gray-500 mb-8 text-center animate-fade-in-up">
            Welcome back! Please sign in to your account.
          </p>

          {/* Email/Password Form */}
          <form className="w-full space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-indigo-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-indigo-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {err && (
              <div className="text-red-500 text-sm text-center">{err}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-xl shadow transition duration-200 animate-fade-in"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center w-full">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-3 text-gray-400 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* ✅ Google Auth Button (separated feature) */}
          <GoogleAuthButton />

          {/* Footer */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <span
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
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
    </div>
  );
}
