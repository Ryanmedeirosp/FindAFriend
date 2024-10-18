import { Prisma, Pet } from '@prisma/client'
import { FindAll, PetRepository } from '../pets-repository'
import crypto from 'node:crypto'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findByID(id: string): Promise<Pet | null> {
    return this.items.find((pet) => pet.id === id) || null
  }

  async findAll(params: FindAll): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))

    return pets
  }
}
