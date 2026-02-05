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
  // Image upload
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/gallery/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  // Create with image upload
  createWithImage: (data, imageFile) => {
    const formData = new FormData();
    formData.append('title_en', data.title_en);
    formData.append('title_fr', data.title_fr);
    formData.append('media_key', data.media_key || '');
    formData.append('order', data.order || 0);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return api.post('/api/gallery/with-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  // Update with image upload
  updateWithImage: (id, data, imageFile) => {
    const formData = new FormData();
    if (data.title_en !== undefined) formData.append('title_en', data.title_en);
    if (data.title_fr !== undefined) formData.append('title_fr', data.title_fr);
    if (data.media_key !== undefined) formData.append('media_key', data.media_key);
    if (data.order !== undefined) formData.append('order', data.order);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return api.put(`/api/gallery/${id}/with-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
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
