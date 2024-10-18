import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new pet', async () => {
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

    const response = await request(app.server)
      .post('/orgs/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({ age: '2', description: 'aa', name: 'aaaa', org_id: org.id })

    expect(response.status).toBe(201)
  })
})
