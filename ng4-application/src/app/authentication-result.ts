export interface IAuthenticationResult {
  _csrf: string,
  sessionId: string,
  authenticated: boolean
}
