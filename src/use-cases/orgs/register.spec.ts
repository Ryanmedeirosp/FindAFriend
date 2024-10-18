import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs-repository'
import { OrgsAlreadyExistsError } from '../errors/orgs-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Org Use Casa', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })
  it('Should be able to create a Org', async () => {
    const { org } = await sut.execute({
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 123123,
      longitude: 123123,
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('Should hash Org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 123123,
      longitude: 123123,
    })
    const isPasswordHashed = await compare('123456', org.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('Should not be able to create an Org with same email', async () => {
    await sut.execute({
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 1232123,
      longitude: 1232123,
    })
    await expect(() =>
      sut.execute({
        name: 'ryan',
        email: 'ryan@gmail.com',
        owner: 'ryan',
        password: '123456',
        phone: '123123',
        city: 'maceio',
        latitude: 123123,
        longitude: 123123,
      }),
    ).rejects.toBeInstanceOf(OrgsAlreadyExistsError)
  })

  it('Should not be able to create an Org with same Adress', async () => {
    await sut.execute({
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 123123,
      longitude: 123123,
    })
    await expect(() =>
      sut.execute({
        name: 'ryan',
        email: 'ryaasdasn@gmail.com',
        owner: 'ryan',
        password: '123456',
        phone: '123123',
        city: 'maceio',
        latitude: 123123,
        longitude: 123123,
      }),
    ).rejects.toBeInstanceOf(OrgsAlreadyExistsError)
  })
})
