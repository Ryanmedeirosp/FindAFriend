import { prisma } from '@/lib/prisma'
import { Org, Prisma } from '@prisma/client'
import { FindMany, OrgsRepository } from '../orgs-repository'
import { Decimal } from '@prisma/client/runtime/library'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByID(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByLocal(params: FindMany): Promise<Org | null> {
    const org = await prisma.org.findFirst({
      where: {
        latitude: new Decimal(params.latitude.toString()),
        longitude: new Decimal(params.longitude.toString()),
      },
    })

    return org
  }
}
