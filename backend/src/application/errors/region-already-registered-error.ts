export class RegionAlreadyRegisteredError extends Error {
  constructor () {
    super('The received REGION is already registered')
    this.name = 'RegionAlreadyRegisteredError'
  }
}
