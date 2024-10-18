import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { findAllPetUsecase } from '@/use-cases/factories/find-all-use-case'

const querySchema = z.object({
  city: z.string(),
  age: z.string().optional(),
})

export async function findAllPets(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { city, age } = querySchema.parse(request.query)

  const searchPetsUseCase = findAllPetUsecase()

  try {
    const { pets } = await searchPetsUseCase.execute({
      city,
      age,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
