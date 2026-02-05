import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gosec_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Content APIs
export const contentApi = {
  getHero: () => api.get('/api/content/hero'),
  updateHero: (data) => api.put('/api/content/hero', data),
  getAbout: () => api.get('/api/content/about'),
  updateAbout: (data) => api.put('/api/content/about', data),
};

// Programs APIs
export const programsApi = {
  getAll: () => api.get('/api/programs'),
  getOne: (id) => api.get(`/api/programs/${id}`),
  create: (data) => api.post('/api/programs', data),
  update: (id, data) => api.put(`/api/programs/${id}`, data),
  delete: (id) => api.delete(`/api/programs/${id}`),
};

// Gallery APIs
export const galleryApi = {
  getAll: () => api.get('/api/gallery'),
  getOne: (id) => api.get(`/api/gallery/${id}`),
  create: (data) => api.post('/api/gallery', data),
  update: (id, data) => api.put(`/api/gallery/${id}`, data),
  delete: (id) => api.delete(`/api/gallery/${id}`),
};

// Events APIs
export const eventsApi = {
  getAll: () => api.get('/api/events'),
  getOne: (id) => api.get(`/api/events/${id}`),
  create: (data) => api.post('/api/events', data),
  update: (id, data) => api.put(`/api/events/${id}`, data),
  delete: (id) => api.delete(`/api/events/${id}`),
};

// Media APIs
export const mediaApi = {
  getAll: () => api.get('/api/media'),
  create: (data) => api.post('/api/media', data),
  update: (id, data) => api.put(`/api/media/${id}`, data),
};

// Forms APIs
export const formsApi = {
  submitJoin: (data) => api.post('/api/forms/join', data),
  submitDonate: (data) => api.post('/api/forms/donate', data),
  submitContact: (data) => api.post('/api/forms/contact', data),
  // Admin only
  getJoinForms: () => api.get('/api/forms/join'),
  getDonateForms: () => api.get('/api/forms/donate'),
  getContactForms: () => api.get('/api/forms/contact'),
};

// Auth APIs
export const authApi = {
  login: async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await api.post('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response;
  },
};

export default api;
