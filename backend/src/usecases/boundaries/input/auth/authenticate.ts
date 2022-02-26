export type AuthenticationRequestModel = {
  email: string
  password: string
}

export type AuthenticationResponseModel = {
  name: string
  email: string
  role: string
  accessToken: string
}

export interface IAuthenticate {
  auth (authentication: AuthenticationRequestModel): Promise<AuthenticationResponseModel>
}
