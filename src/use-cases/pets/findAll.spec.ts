import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repository/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs-repository'
import { FindAllUseCase } from './findAll'

describe('find all Pets Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: FindAllUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new FindAllUseCase(petsRepository)
  })
  it('Should be able to search a pet', async () => {
    const org = await orgsRepository.create({
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 123123,
      longitude: 123123,
    })

    await petsRepository.create({
      age: '112',
      description: 'pet do zito',
      name: 'zito ',
      org_id: org.id,
    })

    await petsRepository.create({
      age: '112',
      description: 'pet do zito',
      name: 'zito ',
      org_id: org.id,
    })
    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)
  })
  it('Should be able to search a pet', async () => {
    const org = await orgsRepository.create({
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 123123,
      longitude: 123123,
    })

    await petsRepository.create({
      age: '10',
      description: 'pet do zito',
      name: 'zito ',
      org_id: org.id,
    })

    await petsRepository.create({
      age: '112',
      description: 'pet do zito',
      name: 'zito ',
      org_id: org.id,
    })
    const { pets } = await sut.execute({ city: org.city, age: '10' })

    expect(pets).toHaveLength(1)
  })
})
