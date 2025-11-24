import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('rotafit-auth')
      if (token) {
        try {
          const authData = JSON.parse(token)
          if (authData.state?.token) {
            config.headers.Authorization = `Bearer ${authData.state.token}`
          }
        } catch (error) {
          console.error('Error parsing auth token:', error)
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('rotafit-auth')
        window.location.href = '/auth'
      }
    }
    return Promise.reject(error)
  }
)