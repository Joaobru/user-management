import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../models/User'

class UserController {
  async store (req: Request, res: Response) {
    const repository = getRepository(User)
    const { id, nome, idade, estadoCivil, cpf, cidade, estado } = req.body

    const userExists = await repository.findOne(cpf)

    if (userExists) {
      return res.status(409).json({ success: false, message: 'O cpf já foi cadastrado' })
    } else {
      const user = repository.create({ id, nome, idade, estadoCivil, cpf, cidade, estado })

      await repository.save(user)

      return res.status(201).json({ success: true, message: 'Usuario criado com sucesso!', data: user })
    }
  }

  async index (req: Request, res:Response) {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)

    const repository = getRepository(User)
    const users = await repository.find()

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (users) {
      const userResult = users.slice(startIndex, endIndex)

      return res.status(201).json({ success: true, message: 'Usuarios encontrados!', data: userResult })
    } else {
      return res.status(201).json({ success: true, message: 'Nenhum usuario cadastrado' })
    }
  }

  async getById (req:Request, res:Response) {
    const repository = getRepository(User)
    const id = req.params.id

    const user = await repository.findOne(id)

    return res.status(201).json({ sucess: true, message: 'Usuario encontrado com sucesso', data: user })
  }

  async updateUser (req:Request, res:Response) {
    const repository = getRepository(User)

    const id = parseInt(req.params.id)
    const { nome, idade, estadoCivil, cpf, cidade, estado } = req.body

    let user = await repository.findOne(id)

    user = { id, nome, idade, estadoCivil, cpf, cidade, estado }
    await repository.save(user)

    return res.status(201).json({ sucess: true, message: 'Usuario atualizado com sucesso', user })
  }

  async deleteUser (req:Request, res:Response) {
    const repository = getRepository(User)

    const id = parseInt(req.params.id)

    const user : any = await repository.findOne(id)
    await repository.remove(user)

    return res.status(201).json({ user })
  }
}

export default new UserController()
