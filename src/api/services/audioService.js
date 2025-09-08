import client from '../client/client';

/**
 * Enhance audio volume
 * @param {File} file - Audio file (MP3, WAV, etc.)
 * @returns {Promise<Blob>} - Enhanced audio file as Blob
 */
export const enhanceAudio = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await client.post('/api/audio/enhance-volume/', formData, {
      responseType: 'blob', // ensures binary data
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('Error calling clean-noise API:', error);
    throw error;
  }
};

// Reduce Noise service
export const reduceNoise = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await client.post('/api/audio/clean-audio/', formData, {
      responseType: 'blob', // ensures binary data
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data; // binary audio data
  } catch (error) {
    console.error('Error calling clean-noise API:', error);
    throw error;
  }
};
