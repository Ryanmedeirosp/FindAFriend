import { FastifyInstance } from 'fastify'
import { register } from './controller/Orgs/register'
import { authenticate } from './controller/Orgs/authenticate'
import { findAllPets } from './controller/pets/findAll'
import { findById } from './controller/pets/findId'
import { createPet } from './controller/pets/create'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/session', authenticate)

  app.post('/orgs/pet', createPet)
  app.get('/orgs/pets', findAllPets)
  app.get('/orgs/pets/:id', findById)
}
