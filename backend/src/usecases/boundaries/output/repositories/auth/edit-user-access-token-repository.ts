export interface EditUserAccessTokenRepository {
  updateAccessToken (userId: string, token: string): Promise<void>
}
