import { useState } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await axios.post(
        'http://localhost:8081/api/extract-audio',
        formData,
        {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error extracting audio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-full text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">🎶 SoundMint</h1>
        <p className="mb-8 text-lg text-gray-200">
          Upload your video and extract high-quality audio instantly.
        </p>

        <label className="cursor-pointer bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition block w-full">
          Upload Video
          <input
            type="file"
            accept="video/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {loading && (
          <p className="mt-6 text-indigo-200 font-medium animate-pulse">
            Extracting audio... ⏳
          </p>
        )}

        {downloadUrl && !loading && (
          <a
            href={downloadUrl}
            download="soundmint-audio.mp3"
            className="mt-6 inline-block w-full bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-green-600 transition"
          >
            ⬇️ Download Audio
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
