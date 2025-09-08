// src/api/videoService.js
import client from '../client/client';

export const extractAudio = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await client.post('/api/videos/extract-audio/', formData, {
    responseType: 'blob', // ensure we get binary data
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const extractNoiseFreeAudio = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await client.post(
    '/api/videos/clean-video-audio/',
    formData,
    {
      responseType: 'blob', // ensure we get binary data
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return response.data;
};
