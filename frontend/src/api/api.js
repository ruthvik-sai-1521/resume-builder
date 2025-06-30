import axios from 'axios';
const API_BASE = 'http://localhost:8000';

export const enhanceSection = async (section, content) => {
  const response = await axios.post(`${API_BASE}/ai-enhance`, { section, content });
  return response.data.enhanced;
};

export const saveResume = async (resumeData) => {
  const response = await axios.post(`${API_BASE}/save-resume`, resumeData);
  return response.data;
};
