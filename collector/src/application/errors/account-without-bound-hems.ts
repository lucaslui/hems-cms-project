export class AccountWithoutBoundHemsError extends Error {
  constructor () {
    super('The user does not have a bound hems in his account')
    this.name = 'AccountWithoutBoundHemsError'
  }
}
