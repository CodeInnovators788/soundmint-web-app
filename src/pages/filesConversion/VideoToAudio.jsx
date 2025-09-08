import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // back icon
import { extractAudio } from '../../api/services/videoService';

export default function VideoToAudio() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl(null);
  };

  const handleConvert = async () => {
    if (!file) return alert('Please upload a video first!');
    setLoading(true);
    setDownloadUrl(null);

    try {
      const data = await extractAudio(file);
      const url = window.URL.createObjectURL(new Blob([data]));
      setDownloadUrl(url);
    } catch (err) {
      console.error('Error extracting audio:', err);
      alert('Error converting video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'soundmint-audio.mp3');
    document.body.appendChild(link);
    link.click();
    link.remove();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-gradient-to-tr from-indigo-400 via-purple-300 to-emerald-200 rounded-full filter blur-3xl opacity-60 animate-pulse z-0" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-gradient-to-br from-blue-300 via-indigo-200 to-emerald-100 rounded-full filter blur-3xl opacity-50 animate-blob z-0" />

      {/* Global Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        <div
          className="w-full max-w-3xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-14 mt-10 mb-10 relative
                        animate-card-float transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl"
        >
          {/* Back Icon */}
          <div
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 p-2 rounded-full cursor-pointer 
             bg-black/70 hover:bg-gradient-to-tr from-indigo-500 via-purple-400 to-emerald-400
             transition-all duration-300 flex items-center justify-center shadow-lg"
          >
            <ArrowLeft size={24} className="text-white" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
            🎬 Convert <span className="text-indigo-600">Video</span> to{' '}
            <span className="text-emerald-600">MP3</span>
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Upload your video file and convert it into a high-quality MP3 audio.
            Quick, secure, and private.
          </p>

          {/* File Upload Section */}
          <div className="flex flex-col items-center gap-6">
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center w-full max-w-lg p-6 border-2 border-dashed border-indigo-400 rounded-2xl cursor-pointer 
                bg-indigo-50/50 hover:bg-indigo-100/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              <svg
                className="w-12 h-12 text-indigo-500 mb-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 16v-8m0 0l-4 4m4-4l4 4m6 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2" />
              </svg>
              <span className="text-gray-600 font-medium">
                {file ? file.name : 'Click to upload or drag & drop a video'}
              </span>
              <input
                id="fileUpload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={!file || loading}
              className={`px-10 py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Converting...' : 'Convert to MP3'}
            </button>

            {/* Download Button */}
            {downloadUrl && (
              <button
                onClick={handleDownload}
                className="px-10 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 
                   hover:from-emerald-600 hover:to-emerald-800 text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                ⬇️ Download MP3
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Animations */}
      <style>
        {`
        @keyframes blob {
          0%, 100% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.1) translateY(20px);}
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }

        @keyframes card-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-card-float {
          animation: card-float 4s infinite ease-in-out;
        }
        `}
      </style>
    </div>
  );
}
