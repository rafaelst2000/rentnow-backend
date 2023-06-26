import { Request, Response } from 'express'
import { prisma } from '../server'

const md5 = require('md5')

interface CreateUserRequest extends Request {
  body: {
    name: string
    email: string
    password: string
  }
}

interface User {
  user: {
    id: string
    name: string
    password: string
    email: string
  }
}

interface LoggedRequest extends Request {
  loggedUser: User
}

module.exports = {
  async create(request: CreateUserRequest, response: Response) {
    const { name, email, password } = request.body
    if(!name || !email || !password) return response.status(400).json({ error: 'Bad request'})
  
    const isAlredyInUse = await prisma.users.findFirst({ 
      where: { email }
    })
    if (isAlredyInUse) return response.status(400).json({ error: 'Email is not valid or is alredy in use'})
  
    await prisma.users.create({
      data: { name, email, password: md5(password) }
    })
  
    return response.status(201).json({ message: 'User has been created'})
  },

  async index(request: Request, response: Response) {
    const { id } = request.params
    let users = []

    if (id) {
      const user = await prisma.users.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
        }
      })
      if (user) users.push(user)
    } else {
      users = await prisma.users.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        }
      })
    }    
    if(id && users.length === 0) return response.status(404).json({ error: 'No user found with this id'})
    return response.json(users)
  },

  async update(request: LoggedRequest, response: Response) {
    const { user } = request.loggedUser
    if(!user || !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { name, email, password } = request.body
    if(!name && !email && !password) return response.status(400).json({ error: 'No data to update'})

    const isAlredyInUse = await prisma.users.findFirst({ 
      where: { email }
    })

    if (isAlredyInUse && email && user.email !== email) return response.status(400).json({ error: 'Email is not valid or is alredy in use'})

    const editedUser = {
      name: name || user.name,
      email: email || user.email,
      password: password ? md5(password) : user.password,
    }

    await prisma.users.update({ 
      where: { id: user.id },
      data: editedUser
    })

    return response.status(200).json({ message: 'User has been updated' })
  },

  async delete(request: LoggedRequest, response: Response) {
    const { user } = request.loggedUser
    if(!user || !user.id) return response.status(401).json({ error: 'Not authorized' })

    const userExists = await prisma.users.findFirst({ 
      where: { email: user.email }
    })
    if (!userExists) response.status(404).json({ message: 'User not exists' })

    await prisma.users.delete({
      where: { id: user.id }
    })

    return response.status(200).json({ message: 'User has been deleted' })
  },
}