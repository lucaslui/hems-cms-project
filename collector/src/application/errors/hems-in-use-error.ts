export class HemsInUseError extends Error {
  constructor () {
    super('The received HEMS is already in use')
    this.name = 'HemsInUseError'
  }
}
