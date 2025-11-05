import axios from 'axios'
import AuthService from '@/services/auth.service'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor - เพิ่ม token ทุกครั้งที่ request
instance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default instance
