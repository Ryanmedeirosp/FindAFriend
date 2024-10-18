import { OrgsRepository } from '@/repository/orgs-repository'
import { Org } from '@prisma/client'
import { InvalidCredentials } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)
    if (!org) {
      throw new InvalidCredentials()
    }

    const doesPasswordMatch = await compare(password, org.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentials()
    }

    return {
      org,
    }
  }
}
