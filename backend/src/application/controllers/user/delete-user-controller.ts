import { IDeleteUser } from '@/src/usecases/boundaries/input/user/delete-user'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class DeleteUserController implements IController {
  constructor (
    private readonly deleteUser: IDeleteUser
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { userId } = httpRequest.params
      const isDeleted = await this.deleteUser.delete(userId)
      if (!isDeleted) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
