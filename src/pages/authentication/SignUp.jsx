import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      setErr('');
      setLoading(true);
      const auth = getAuth();
      const db = getFirestore();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Store user info in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: new Date(),
        provider: 'email',
      });
      navigate('/dashboard');
      setLoading(false);
    } catch (error) {
      setErr(
        error.message
          .replace('Firebase:', '')
          .replace('auth/', '')
          .replace(/-/g, ' ')
      );
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErr('');
    setLoading(true);
    try {
      const auth = getAuth();
      const db = getFirestore();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Store user info in Firestore
      await setDoc(
        doc(db, 'users', result.user.uid),
        {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName || '',
          photoURL: result.user.photoURL || '',
          createdAt: new Date(),
          provider: 'google',
        },
        { merge: true }
      );
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa] relative overflow-hidden">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-tr from-indigo-400 via-purple-300 to-emerald-200 rounded-full filter blur-3xl opacity-60 animate-pulse z-0" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-gradient-to-br from-blue-300 via-indigo-200 to-emerald-100 rounded-full filter blur-3xl opacity-50 animate-blob z-0" />
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-10 md:p-12 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight animate-fade-in-down text-center">
            Create your <span className="text-indigo-600">SoundMint</span>{' '}
            account
          </h2>
          <p className="text-gray-500 mb-8 text-center animate-fade-in-up">
            Sign up to start converting and enhancing your audio!
          </p>
          <form className="w-full space-y-5" onSubmit={handleSignup}>
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
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          <div className="my-5 flex items-center w-full">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-3 text-gray-400 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-xl shadow transition duration-200 animate-fade-in"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <g>
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.86-6.86C36.13 2.24 30.45 0 24 0 14.82 0 6.71 5.8 2.69 14.09l7.98 6.19C12.13 13.47 17.61 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.1 24.55c0-1.64-.15-3.21-.43-4.73H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.92 37.07 46.1 31.37 46.1 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.67 28.28a14.5 14.5 0 010-8.56l-7.98-6.19A23.97 23.97 0 000 24c0 3.77.9 7.34 2.69 10.47l7.98-6.19z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.45 0 12.13-2.13 16.65-5.81l-7.19-5.6c-2.01 1.35-4.58 2.16-7.46 2.16-6.39 0-11.87-3.97-13.33-9.47l-7.98 6.19C6.71 42.2 14.82 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>
            Continue with Google
          </button>
          <div className="mt-6 text-center text-gray-500 text-sm">
            Already have an account?{' '}
            <span
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
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
