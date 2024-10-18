export class OrgsAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
