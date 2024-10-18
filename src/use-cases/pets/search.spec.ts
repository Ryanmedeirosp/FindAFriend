import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repository/in-memory/in-memory-pets-repository'
import { SearchUseCase } from './search'
import { NotFoundError } from '../errors/not-found-error'
import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs-repository'

describe('Search a Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchUseCase(petsRepository)
  })
  it('Should be able to search a pet', async () => {
    const cretedPet = await petsRepository.create({
      age: '112',
      description: 'pet do zito',
      name: 'zito ',
      org_id: '1',
    })

    const { pet } = await sut.execute({
      id: cretedPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it('Should not be able to search a pet', async () => {
    await expect(() =>
      sut.execute({
        id: 'aleatorio',
      }),
    ).rejects.toBeInstanceOf(NotFoundError)
  })
})
