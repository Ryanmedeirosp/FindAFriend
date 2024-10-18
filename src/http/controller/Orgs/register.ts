import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { OrgsAlreadyExistsError } from '@/use-cases/errors/orgs-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBody = z.object({
    owner: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    city: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const { owner, name, email, password, phone, city, latitude, longitude } =
    registerBody.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      owner,
      password,
      phone,
      city,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof OrgsAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
