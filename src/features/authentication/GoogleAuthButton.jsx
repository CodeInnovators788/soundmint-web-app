import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './authenticationSlice';

export default function GoogleAuthButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const dispatch = useDispatch();

  const handleGoogle = async () => {
    setErr('');
    setLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      // ✅ Sign in with Google
      const result = await signInWithPopup(auth, provider);

      // ✅ Save user to Redux
      dispatch(addUser(result.user));

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
    <div className="w-full">
      {err && <div className="text-red-500 text-sm text-center">{err}</div>}

      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 
                   bg-black hover:bg-gray-900
                   text-white font-semibold py-3 px-8 
                   rounded-xl shadow-md transition duration-200 
                   animate-fade-in"
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
        {loading ? 'Signing in...' : 'Continue with Google'}
      </button>
    </div>
  );
}
