export type SaveDataRequestModel = {
    hemsId: string
    topic: string
    payload: string
}

export type SaveDataResponseModel = {
    result: string | { error: string }
}

export interface IHemsSaveDataUsecase {
    save (data: SaveDataRequestModel): Promise<SaveDataResponseModel>
}