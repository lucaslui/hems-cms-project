import jwt from 'jsonwebtoken'
import { IDecrypter } from '../../usecases/boundaries/output/criptography/decrypter'
import { IEncrypter } from '../../usecases/boundaries/output/criptography/encrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string | object> {
    const decodedToken = await jwt.verify(token, this.secret)
    return decodedToken
  }
}
