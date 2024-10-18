import { Pet } from '@prisma/client'
import { PetRepository } from '@/repository/pets-repository'
import { NotFoundError } from '../errors/not-found-error'

interface FindAllPetUseCaseRequest {
  city: string
  age?: string
}

interface FindAllPetUseCaseResponse {
  pets: Pet[]
}

export class FindAllUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
    age,
  }: FindAllPetUseCaseRequest): Promise<FindAllPetUseCaseResponse> {
    const pets = await this.petRepository.findAll({ city, age })

    if (!pets) {
      throw new NotFoundError()
    }

    return { pets }
  }
}
