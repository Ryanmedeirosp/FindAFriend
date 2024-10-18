import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs-repository'
import { CreateUseCase } from './create'
import { InMemoryPetsRepository } from '@/repository/in-memory/in-memory-pets-repository'
import { NotFoundError } from '../errors/not-found-error'

describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: CreateUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreateUseCase(petsRepository, orgsRepository)
  })

  it('Should be able to create a new pet', async () => {
    const org = await orgsRepository.create({
      id: '1',
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 123123,
      longitude: 123123,
    })

    const { pet } = await sut.execute({
      age: '2',
      description: 'aa',
      name: 'aaaa',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it('Should not be able to create a new pet', async () => {
    await expect(() =>
      sut.execute({
        age: '2',
        description: 'aa',
        name: 'aaaa',
        org_id: '0000000000000000',
      }),
    ).rejects.toBeInstanceOf(NotFoundError)
  })
})
