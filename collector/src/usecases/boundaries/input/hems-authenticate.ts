export type AuthenticationRequestModel = {
    hemsId: string
    username: string
    password: string
}

export type AuthenticationResponseModel = {
    result: string | { error: string }
}

export interface IHemsAuthenticateUsecase {
    auth (authenticationData: AuthenticationRequestModel): Promise<AuthenticationResponseModel>
}