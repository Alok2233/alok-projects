const API_URL = import.meta.env.VITE_API_URL || 'https://alok-projects.onrender.com/api';


// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem('auth_token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('current_user');
  return userStr ? JSON.parse(userStr) : null;
};

// Set current user in localStorage
export const setCurrentUser = (user) => {
  localStorage.setItem('current_user', JSON.stringify(user));
};

// Remove current user from localStorage
export const removeCurrentUser = () => {
  localStorage.removeItem('current_user');
};

// Create headers with auth token
const getHeaders = (isFormData = false) => {
  const headers = {};
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Handle API errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || 'An error occurred');
  }
  return response.json();
};

// ==================== AUTH API ====================

export const authApi = {
  register: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    
    // Store token and user
    setAuthToken(data.token);
    setCurrentUser(data.user);
    
    return data;
  },

  logout: () => {
    removeAuthToken();
    removeCurrentUser();
  },

  verify: async () => {
    const response = await fetch(`${API_URL}/auth/verify`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// ==================== PROJECTS API ====================

export const projectsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/projects`);
    return handleResponse(response);
  },

  create: async (data, imageFile) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData,
    });
    return handleResponse(response);
  },

  update: async (id, data, imageFile) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: formData,
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== CLIENTS API ====================

export const clientsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/clients`);
    return handleResponse(response);
  },

  create: async (data, imageFile) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('designation', data.designation);
    formData.append('description', data.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData,
    });
    return handleResponse(response);
  },

  update: async (id, data, imageFile) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('designation', data.designation);
    formData.append('description', data.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: formData,
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== CONTACTS API ====================

export const contactsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/contacts`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// ==================== NEWSLETTERS API ====================

export const newslettersApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/newsletters`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  subscribe: async (email) => {
    const response = await fetch(`${API_URL}/newsletters`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },
};
