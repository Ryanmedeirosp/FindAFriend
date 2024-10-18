import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentials } from '../errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate'

describe('Authentica Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })
  it('Should be able to authenticate a Org', async () => {
    await orgsRepository.create({
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: await hash('123456', 6),
      phone: '123123',
      city: 'maceio',
      latitude: 123123,
      longitude: 123123,
    })

    const { org } = await sut.execute({
      email: 'ryan@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('Should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'ze@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
  it('Should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: await hash('123456', 6),
      phone: '123123',
      city: 'maceio',
      latitude: 123123,
      longitude: 123123,
    })

    await expect(() =>
      sut.execute({
        email: 'ryansadf@gmail.com',
        password: '12323456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
