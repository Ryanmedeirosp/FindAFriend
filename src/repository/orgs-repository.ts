import { Org, Prisma } from '@prisma/client'

export interface FindMany {
  latitude: number
  longitude: number
}

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findByID(id: string): Promise<Org | null>
  findByLocal(params: FindMany): Promise<Org | null>
}
