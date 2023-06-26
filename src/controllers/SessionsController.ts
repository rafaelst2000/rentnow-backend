import { Request, Response } from 'express'
import { prisma } from '../server'

const jwt = require('jsonwebtoken')
const md5 = require('md5')

interface LoginRequest extends Request {
  body: {
    email: string
    password: string
  }
}

module.exports = {
  async login(request: LoginRequest, response: Response) {
    const { email, password } = request.body
    if (!email || !password) return response.status(400).json({ error: 'Bad request' })

    const user = await prisma.users.findFirst({
      where: { email, password: md5(password) }
    })
    if (!user) return response.status(400).json({ error: 'Wrong credentials' })

    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return response.status(200).json({ message: 'User has been authenticated', token, name: user.name })
  }
}