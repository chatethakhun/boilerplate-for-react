import storage from '@/utils/storage'

class AuthToken {
  private readonly ACCESS_TOKEN_KEY = 'accessToken'
  private readonly REFRESH_TOKEN_KEY = 'refreshToken'

  getAccessToken(): string | null {
    return storage.getItem(this.ACCESS_TOKEN_KEY)
  }

  getRefreshToken(): string | null {
    return storage.getItem(this.REFRESH_TOKEN_KEY)
  }

  setAccessToken(token: string): void {
    storage.setItem(this.ACCESS_TOKEN_KEY, token)
  }

  setRefreshToken(token: string): void {
    storage.setItem(this.REFRESH_TOKEN_KEY, token)
  }

  setTokens(accessToken: string, refreshToken?: string): void {
    this.setAccessToken(accessToken)
    if (refreshToken) {
      this.setRefreshToken(refreshToken)
    }
  }

  clearTokens(): void {
    storage.removeItem(this.ACCESS_TOKEN_KEY)
    storage.removeItem(this.REFRESH_TOKEN_KEY)
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }
}

export default new AuthToken()
