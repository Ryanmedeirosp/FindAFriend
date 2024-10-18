import { NotFoundError } from '@/use-cases/errors/not-found-error'
import { fetchPetUsecase } from '@/use-cases/factories/fetch-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  id: z.string(),
})

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = bodySchema.parse(request.params)

  const getPet = fetchPetUsecase()

  try {
    const { pet } = await getPet.execute({ id })

    return reply.status(200).send(pet)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
