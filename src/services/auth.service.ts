import AuthToken from '@/utils/auth'

export default class AuthService {
  static getToken = () => {
    return AuthToken.getAccessToken()
  }
}
