import { Pet, Prisma } from '@prisma/client'

export interface FindAll {
  city: string
  age?: string
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByID(id: string): Promise<Pet | null>
  findAll(params: FindAll): Promise<Pet[]>
}
