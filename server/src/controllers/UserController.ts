import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../models/User'

class UserController {
  async store (req: Request, res: Response) {
    const repository = getRepository(User)
    const { id, nome, idade, estadoCivil, cpf, cidade, estado } = req.body

    const userExists = await repository.find({ cpf: cpf })

    if (userExists.length === 1) {
      return res.status(201).json({ success: false, message: 'O cpf já foi cadastrado' })
    } else {
      const user = repository.create({ id, nome, idade, estadoCivil, cpf, cidade, estado })

      await repository.save(user)

      return res.status(201).json({ success: true, message: 'Usuário criado com sucesso!', data: user })
    }
  }

  async index (req: Request, res:Response) {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)

    const repository = getRepository(User)
    const [users, totalUsers] = await repository.findAndCount()

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const totalPage = totalUsers / limit

    if (users) {
      const userResult = users.slice(startIndex, endIndex)

      return res.status(201).json({ success: true, message: 'Usuários encontrados!', data: userResult, totalPages: totalPage })
    } else {
      return res.status(201).json({ success: true, message: 'Nenhum usuário cadastrado', data: [] })
    }
  }

  async getById (req:Request, res:Response) {
    const repository = getRepository(User)
    const id = req.params.id

    const user = await repository.findOne(id)

    return res.status(201).json({ success: true, message: 'Usuário encontrado com sucesso', data: user })
  }

  async updateUser (req:Request, res:Response) {
    const repository = getRepository(User)

    const id = parseInt(req.params.id)
    const { nome, idade, estadoCivil, cpf, cidade, estado } = req.body

    let user = await repository.findOne(id)

    if (user) {
      user = { id, nome, idade, estadoCivil, cpf, cidade, estado }
      await repository.save(user)

      return res.status(201).json({ success: true, message: 'Usuário atualizado com sucesso', user })
    } else {
      return res.status(201).json({ success: false, message: 'Usuário não encontrado' })
    }
  }

  async deleteUser (req:Request, res:Response) {
    const repository = getRepository(User)

    const id = parseInt(req.params.id)

    const user : any = await repository.findOne(id)
    if (user) {
      await repository.remove(user)

      return res.status(201).json({ success: true, message: 'Usuário deletado com sucesso' })
    } else {
      return res.status(201).json({ success: false, message: 'Usuário não encontrado' })
    }
  }
}

export default new UserController()
