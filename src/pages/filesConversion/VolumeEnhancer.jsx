import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { enhanceAudio } from '../../api/services/audioService';

export default function VolumeEnhancer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const navigate = useNavigate();

  // File selected via click or drag
  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setDownloadUrl(null);
  };

  // Convert/enhance audio
  const handleEnhance = async () => {
    if (!file) return alert('Please upload an audio file first!');
    setLoading(true);
    setDownloadUrl(null);

    try {
      const data = await enhanceAudio(file);
      console.log(data);
      const url = window.URL.createObjectURL(new Blob([data]));
      setDownloadUrl(url);
    } catch (err) {
      console.error('Error enhancing audio:', err);
      alert('Error processing audio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Download enhanced audio
  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'enhanced-audio.mp3');
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

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        <div
          className="w-full max-w-3xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-14 mt-10 mb-10 relative
                        animate-card-float transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl"
        >
          {/* Back icon */}
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
            🔊 Enhance <span className="text-indigo-600">MP3</span> Volume
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Upload your audio file and boost its volume instantly. High-quality,
            secure, and private enhancement.
          </p>

          {/* File Upload */}
          <div className="flex flex-col items-center gap-6">
            <div
              onClick={() => document.getElementById('fileUpload').click()}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const droppedFile = e.dataTransfer.files[0];
                if (droppedFile && droppedFile.type.startsWith('audio/')) {
                  handleFileChange(droppedFile);
                } else {
                  alert('Please drop a valid audio file (MP3, WAV, etc.)');
                }
              }}
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
                {file
                  ? file.name
                  : 'Click to upload or drag & drop an MP3 file'}
              </span>
              <input
                id="fileUpload"
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  if (e.target.files.length > 0)
                    handleFileChange(e.target.files[0]);
                }}
                className="hidden"
              />
            </div>

            {/* Enhance button */}
            <button
              onClick={handleEnhance}
              disabled={!file || loading}
              className={`px-10 py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Enhancing...' : 'Enhance Volume'}
            </button>

            {/* Download button */}
            {downloadUrl && (
              <button
                onClick={handleDownload}
                className="px-10 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 
                           hover:from-emerald-600 hover:to-emerald-800 text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                ⬇️ Download Enhanced MP3
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Animations */}
      <style>
        {`
        @keyframes blob {
          0%, 100% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.1) translateY(20px);}
        }
        .animate-blob { animation: blob 8s infinite ease-in-out; }

        @keyframes card-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-card-float { animation: card-float 4s infinite ease-in-out; }
        `}
      </style>
    </div>
  );
}
