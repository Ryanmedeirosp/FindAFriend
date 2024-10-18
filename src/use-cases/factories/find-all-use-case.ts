import { FindAllUseCase } from '../pets/findAll'

import { PrismaPetsRepository } from '@/repository/prisma/prisma-pets-repository'

export function findAllPetUsecase() {
  const petRepository = new PrismaPetsRepository()
  const findAllPetUsecase = new FindAllUseCase(petRepository)

  return findAllPetUsecase
}
