export type AuthorizeRequestModel = {
    hemsId: string
    topic: string
}

export type AuthorizeResponseModel = {
    result: string | { error: string }
}

export interface IHemsTopicAuthorizeUsecase {
    auth (authorizeData: AuthorizeRequestModel): Promise<AuthorizeResponseModel>
}