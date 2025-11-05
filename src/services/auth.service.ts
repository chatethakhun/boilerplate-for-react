import { getAccessToken } from '@/utils/auth'

export default class AuthService {
  static getToken = () => {
    return getAccessToken()
  }
}
