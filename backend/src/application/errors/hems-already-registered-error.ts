export class HemsAlreadyRegisteredError extends Error {
  constructor () {
    super('The received HEMS is already registered')
    this.name = 'HemsAlreadyRegisteredError'
  }
}
