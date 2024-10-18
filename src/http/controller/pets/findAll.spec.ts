import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('find all Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search all pets by city', async () => {
    const org = {
      id: crypto.randomUUID(),
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 1232123,
      longitude: 1232123,
    }

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/session')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({ age: '200', description: 'aa', name: 'aaaa', org_id: org.id })

    const response = await request(app.server)
      .get(`/orgs/pets`)
      .query({ city: org.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/orgs/pets')

    expect(response.status).toBe(400)
  })
  it('should be able to search all pets by city and age', async () => {
    const org = {
      id: crypto.randomUUID(),
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 1232123,
      longitude: 1232123,
    }

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/session')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({ age: '20', description: 'aa', name: 'aaaa', org_id: org.id })

    await request(app.server)
      .post('/orgs/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({ age: '30', description: 'aa', name: 'aaaa', org_id: org.id })

    const response = await request(app.server)
      .get(`/orgs/pets`)
      .query({ city: org.city, age: '30' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
