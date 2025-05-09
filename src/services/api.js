import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

// Request interceptor
api.interceptors.request.use(config => {
  console.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
  return config;
}, error => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(response => {
  console.log(`Response: ${response.status} ${response.config.url}`);
  return response;
}, error => {
  if (error.response) {
    console.error('API Error:', {
      status: error.response.status,
      data: error.response.data,
      url: error.response.config.url
    });
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Request setup error:', error.message);
  }
  return Promise.reject(error);
});

// Sector API
export const getSectors = async () => {
  try {
    const response = await api.get('/sectors');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return [];
  }
};

// Organization API
export const getOrganizations = async () => {
  try {
    const response = await api.get('/organizations');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return [];
  }
};

// Dataset API
export const getDatasets = async (params = {}) => {
  try {
    const response = await api.get('/datasets', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching datasets:', error);
    return [];
  }
};

// Infografis API
export const getInfografis = async () => {
  try {
    const response = await api.get('/infografis');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching infografis:', error);
    return [];
  }
};

// Stats API
export const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      total_datasets: 0,
      total_organizations: 0,
      total_infografis: 0,
      total_sectors: 0
    };
  }
};

// Search API
export const searchData = async (query) => {
  try {
    const response = await api.get('/datasets/search', {
      params: { q: query }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error searching data:', error);
    return [];
  }
};