import { NotFoundError } from '@/use-cases/errors/not-found-error'
import { makeAPetUseCase } from '@/use-cases/factories/make-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  description: z.string(),
  age: z.string(),
})

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }

  const body = bodySchema.parse(request.body)

  const createPetUseCase = makeAPetUseCase()

  const org_id = request.user.sub

  try {
    const { pet } = await createPetUseCase.execute({ ...body, org_id })

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
