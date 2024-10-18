import { Pet } from '@prisma/client'
import { PetRepository } from '@/repository/pets-repository'
import { OrgsRepository } from '@/repository/orgs-repository'
import { NotFoundError } from '../errors/not-found-error'

interface CreateUseCaseRequest {
  name: string
  description: string
  age: string
  org_id: string
}

interface CreateUseCaseResponse {
  pet: Pet
}

export class CreateUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    org_id,
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const org = await this.orgRepository.findByID(org_id)

    if (!org) {
      throw new NotFoundError()
    }

    const pet = await this.petRepository.create({
      name,
      age,
      description,
      org_id,
    })

    return { pet }
  }
}
