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
  // Image upload
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/events/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  // Create with image upload
  createWithImage: (data, imageFile) => {
    const formData = new FormData();
    formData.append('date_en', data.date_en);
    formData.append('date_fr', data.date_fr);
    formData.append('title_en', data.title_en);
    formData.append('title_fr', data.title_fr);
    formData.append('location_en', data.location_en);
    formData.append('location_fr', data.location_fr);
    formData.append('summary_en', data.summary_en);
    formData.append('summary_fr', data.summary_fr);
    formData.append('media_key', data.media_key || '');
    formData.append('order', data.order || 0);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return api.post('/api/events/with-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  // Update with image upload
  updateWithImage: (id, data, imageFile) => {
    const formData = new FormData();
    if (data.date_en !== undefined) formData.append('date_en', data.date_en);
    if (data.date_fr !== undefined) formData.append('date_fr', data.date_fr);
    if (data.title_en !== undefined) formData.append('title_en', data.title_en);
    if (data.title_fr !== undefined) formData.append('title_fr', data.title_fr);
    if (data.location_en !== undefined) formData.append('location_en', data.location_en);
    if (data.location_fr !== undefined) formData.append('location_fr', data.location_fr);
    if (data.summary_en !== undefined) formData.append('summary_en', data.summary_en);
    if (data.summary_fr !== undefined) formData.append('summary_fr', data.summary_fr);
    if (data.media_key !== undefined) formData.append('media_key', data.media_key);
    if (data.order !== undefined) formData.append('order', data.order);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return api.put(`/api/events/${id}/with-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Leadership APIs
export const leadershipApi = {
  getAll: () => api.get('/api/leadership'),
  getOne: (id) => api.get(`/api/leadership/${id}`),
  create: (data) => api.post('/api/leadership', data),
  update: (id, data) => api.put(`/api/leadership/${id}`, data),
  delete: (id) => api.delete(`/api/leadership/${id}`),
  // Image upload
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/leadership/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  // Create with image upload
  createWithImage: (data, imageFile) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('role_en', data.role_en);
    formData.append('role_fr', data.role_fr);
    formData.append('bio_en', data.bio_en || '');
    formData.append('bio_fr', data.bio_fr || '');
    formData.append('email', data.email || '');
    formData.append('linkedin', data.linkedin || '');
    formData.append('order', data.order || 0);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return api.post('/api/leadership/with-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  // Update with image upload
  updateWithImage: (id, data, imageFile) => {
    const formData = new FormData();
    if (data.name !== undefined) formData.append('name', data.name);
    if (data.role_en !== undefined) formData.append('role_en', data.role_en);
    if (data.role_fr !== undefined) formData.append('role_fr', data.role_fr);
    if (data.bio_en !== undefined) formData.append('bio_en', data.bio_en);
    if (data.bio_fr !== undefined) formData.append('bio_fr', data.bio_fr);
    if (data.email !== undefined) formData.append('email', data.email);
    if (data.linkedin !== undefined) formData.append('linkedin', data.linkedin);
    if (data.order !== undefined) formData.append('order', data.order);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return api.put(`/api/leadership/${id}/with-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
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
