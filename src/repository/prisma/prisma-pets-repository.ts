import { Prisma, Pet } from '@prisma/client'
import { FindAll, PetRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findByID(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findAll(params: FindAll): Promise<Pet[]> {
    const pet = await prisma.pet.findMany({
      where: {
        age: params.age,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })
    return pet
  }
}
