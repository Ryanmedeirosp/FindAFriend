import { Pet } from '@prisma/client'
import { PetRepository } from '@/repository/pets-repository'
import { NotFoundError } from '../errors/not-found-error'

interface SearchPetUseCaseRequest {
  id: string
}

interface SearchPetUseCaseResponse {
  pet: Pet
}

export class SearchUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    id,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const pet = await this.petRepository.findByID(id)

    if (!pet) {
      throw new NotFoundError()
    }

    return { pet }
  }
}
