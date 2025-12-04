import axios from 'axios'
import AuthToken from '@/utils/auth'

class ApiClient {
  private instance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = AuthToken.getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )
  }

  get<T>(url: string, config?: object) {
    return this.instance.get<T>(url, config)
  }

  post<T>(url: string, data?: object, config?: object) {
    return this.instance.post<T>(url, data, config)
  }

  put<T>(url: string, data?: object, config?: object) {
    return this.instance.put<T>(url, data, config)
  }

  patch<T>(url: string, data?: object, config?: object) {
    return this.instance.patch<T>(url, data, config)
  }

  delete<T>(url: string, config?: object) {
    return this.instance.delete<T>(url, config)
  }
}

export default new ApiClient()
