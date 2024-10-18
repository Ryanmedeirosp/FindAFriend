import { Prisma, Org } from '@prisma/client'
import { FindMany, OrgsRepository } from '../orgs-repository'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((org) => org.email === email) || null
  }

  async findByID(id: string): Promise<Org | null> {
    return this.items.find((org) => org.id === id) || null
  }

  async findByLocal(params: FindMany): Promise<Org | null> {
    return (
      this.items.find(
        (org) =>
          org.latitude.equals(new Decimal(params.latitude.toString())) &&
          org.longitude.equals(new Decimal(params.longitude.toString())),
      ) || null
    )
  }
}
