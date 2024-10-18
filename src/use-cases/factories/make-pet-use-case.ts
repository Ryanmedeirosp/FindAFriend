import { PrismaOrgsRepository } from '@/repository/prisma/prisma-orgs-repository'
import { CreateUseCase } from '../pets/create'
import { PrismaPetsRepository } from '@/repository/prisma/prisma-pets-repository'

export function makeAPetUseCase() {
  const petRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const makeAPetUseCase = new CreateUseCase(petRepository, orgsRepository)

  return makeAPetUseCase
}
