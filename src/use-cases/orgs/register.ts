import { OrgsRepository } from '@/repository/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgsAlreadyExistsError } from '../errors/orgs-already-exists-error'
import { Org } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  owner: string
  password: string
  phone: string
  city: string
  latitude: number
  longitude: number
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    owner,
    password,
    phone,
    city,
    latitude,
    longitude,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const sameEmail = await this.orgsRepository.findByEmail(email)
    const sameLocal = await this.orgsRepository.findByLocal({
      latitude,
      longitude,
    })

    if (sameEmail || sameLocal) {
      throw new OrgsAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      owner,
      password: password_hash,
      phone,
      city,
      latitude,
      longitude,
    })

    return {
      org,
    }
  }
}
