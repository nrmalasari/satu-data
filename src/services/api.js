import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Configurasi API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
  timeout: 20000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const requestId = uuidv4();
    const visitId = config.headers['X-Visit-ID'] || uuidv4();
    config.headers['X-Request-ID'] = requestId;
    config.headers['X-Visit-ID'] = visitId;
    console.groupCollapsed(`Request ${requestId}: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('Full Request Config:', {
      baseURL: config.baseURL,
      url: config.url,
      params: config.params,
      data: config.data,
      headers: config.headers,
    });
    console.groupEnd();
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.groupCollapsed(`Response ${response.config.headers['X-Request-ID']}: ${response.status} ${response.config.url}`);
    console.log('Response Data:', response.data);
    console.groupEnd();
    return response;
  },
  (error) => {
    const errorData = {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          }
        : null,
    };
    console.error('API Error:', errorData);
    return Promise.reject(errorData);
  }
);

// Fungsi untuk retry dengan exponential backoff
const withRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) {
      console.error('Max retries reached:', err);
      throw err;
    }
    const isRetryable =
      !err.response ||
      (err.response.status >= 500 && err.response.status <= 599) ||
      err.code === 'ECONNABORTED' ||
      err.code === 'ECONNRESET';
    if (!isRetryable) {
      throw err;
    }
    const nextDelay = delay * (1 + Math.random());
    console.warn(`Retrying (${4 - retries} left) in ${nextDelay}ms...`, err);
    await new Promise((resolve) => setTimeout(resolve, nextDelay));
    return withRetry(fn, retries - 1, delay * 2);
  }
};

// Helper untuk validasi response
const validateResponse = (response) => {
  if (!response.data) {
    throw {
      name: 'InvalidResponseError',
      message: 'Response data is empty',
      response,
    };
  }
  // Kembalikan response.data langsung untuk endpoint seperti incrementView
  return response.data.data || response.data;
};

// Sector API
export const getSectors = async () => {
  return withRetry(async () => {
    const response = await api.get('/sectors');
    return validateResponse(response);
  });
};

// Organization API
export const getOrganizations = async (params = {}) => {
  return withRetry(async () => {
    const response = await api.get('/organizations', {
      params: {
        ...params,
        _: new Date().getTime(),
      },
    });
    return validateResponse(response);
  });
};

export const getOrganizationById = async (id) => {
  return withRetry(async () => {
    const response = await api.get(`/organizations/${id}`);
    const data = validateResponse(response);
    if (!data || !data.id) {
      throw {
        name: 'NotFoundError',
        message: `Organization with id ${id} not found`,
        response,
      };
    }
    return data;
  });
};

// Dataset API
export const getDatasets = async (params = {}) => {
  return withRetry(async () => {
    const response = await api.get('/datasets', {
      params: {
        ...params,
        _: new Date().getTime(),
      },
    });
    return validateResponse(response);
  });
};

// Get single dataset by ID
export const getDatasetById = async (id) => {
  return withRetry(async () => {
    const response = await api.get(`/datasets/${id}`);
    const data = validateResponse(response);
    if (!data || !data.id) {
      throw {
        name: 'NotFoundError',
        message: `Dataset with id ${id} not found`,
        response,
      };
    }
    return data;
  });
};

// Increment view count tanpa debounce
export const incrementViewCount = async (datasetId) => {
  return withRetry(async () => {
    console.log(`[incrementViewCount] Attempting to increment view for dataset ${datasetId}`);
    const response = await api.post(`/datasets/${datasetId}/increment-view`);
    const data = validateResponse(response);
    console.log(`[incrementViewCount] Success for dataset ${datasetId}:`, data);
    return data;
  });
};

// Increment download count
export const incrementDownloadCount = async (datasetId) => {
  return withRetry(async () => {
    console.log(`[incrementDownloadCount] Attempting to increment download for dataset ${datasetId}`);
    const response = await api.post(`/datasets/${datasetId}/increment-download`);
    const data = validateResponse(response);
    console.log(`[incrementDownloadCount] Success for dataset ${datasetId}:`, data);
    return data;
  });
};

// Preview file
export const getFilePreviewUrl = (id) => {
  return `${api.defaults.baseURL}/datasets/${id}/preview?_=${new Date().getTime()}`;
};

// Download file
export const getFileDownloadUrl = (id) => {
  return `${api.defaults.baseURL}/datasets/${id}/download?_=${new Date().getTime()}`;
};

// Infografis API
export const getInfografis = async () => {
  return withRetry(async () => {
    const response = await api.get('/infografis');
    const data = validateResponse(response);
    console.log('[getInfografis] Data:', data);
    if (!Array.isArray(data)) {
      console.warn('[getInfografis] Expected array, got:', data);
      return [];
    }
    return data;
  });
};

// Get single infografis by ID
export const getInfografisById = async (id) => {
  return withRetry(async () => {
    const response = await api.get(`/infografis/${id}`);
    const data = validateResponse(response);
    if (!data || !data.id) {
      throw {
        name: 'NotFoundError',
        message: `Infografis dengan id ${id} tidak ditemukan`,
        response,
      };
    }
    return data;
  });
};

// Mengambil daftar tabel untuk organisasi tertentu
export const getTablesByOrganization = async (organizationId) => {
  return withRetry(async () => {
    const response = await api.get(`/organizations/${organizationId}/tables`);
    const data = validateResponse(response);
    if (!data || !Array.isArray(data)) {
      throw {
        name: 'InvalidResponseError',
        message: `Tabel untuk organisasi ${organizationId} tidak ditemukan`,
        response,
      };
    }
    return data;
  });
};

// Mengambil data tabel berdasarkan organizationId dan tableId
export const getTableById = async (organizationId, tableId) => {
  return withRetry(async () => {
    const response = await api.get(`/organizations/${organizationId}/tables/${tableId}`);
    const data = validateResponse(response);
    if (!data || !data.id) {
      throw {
        name: 'NotFoundError',
        message: `Tabel dengan ID ${tableId} untuk organisasi ${organizationId} tidak ditemukan`,
        response,
      };
    }
    return data;
  });
};

// Stats API
export const getStats = async () => {
  return withRetry(async () => {
    const response = await api.get('/stats');
    const data = validateResponse(response);
    return {
      total_datasets: 0,
      total_organizations: 0,
      total_infografis: 0,
      total_sectors: 0,
      ...data,
    };
  });
};

// Search API
export const searchData = async (query) => {
  return withRetry(async () => {
    const response = await api.get('/datasets/search', {
      params: {
        q: query,
        _: new Date().getTime(),
      },
    });
    return validateResponse(response);
  });
};

// Fungsi utilitas untuk debugging
export const debugApi = {
  setBaseUrl: (url) => {
    api.defaults.baseURL = url;
  },
  getBaseUrl: () => api.defaults.baseURL,
  setAuthToken: (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  clearAuthToken: () => {
    delete api.defaults.headers.common['Authorization'];
  },
};