import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'ryan',
      email: 'ryan@gmail.com',
      owner: 'ryan',
      password: '123456',
      phone: '123123',
      city: 'maceio',
      latitude: 1232123,
      longitude: 1232123,
    })

    expect(response.status).toBe(201)
  })
})
