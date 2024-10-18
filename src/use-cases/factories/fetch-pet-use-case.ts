import { SearchUseCase } from '../pets/search'
import { PrismaPetsRepository } from '@/repository/prisma/prisma-pets-repository'

export function fetchPetUsecase() {
  const petRepository = new PrismaPetsRepository()
  const fetchPetUsecase = new SearchUseCase(petRepository)

  return fetchPetUsecase
}
