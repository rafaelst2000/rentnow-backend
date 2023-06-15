import express from 'express'
import cors from 'cors'
import login from './middleware/login'
import { PrismaClient } from '@prisma/client'

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

app.get('/teste', async (request, response) => {
  return response.json({ message: 'it works!'})
})

/* CREATE USER ROUTE */
app.post('/users', async (request, response) => {
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
})

/* LOGIN ROUTE */
app.post('/sessions', async (request, response) => {
  const { email, password } = request.body
  if(!email || !password) return response.status(400).json({ error: 'Bad request'})

  const user = await prisma.users.findFirst({
    where: { email, password: md5(password) }
  })
  if (!user) return response.status(400).json({ error: 'Wrong credentials'})

  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" })
  return response.status(200).json({ message: 'User has been authenticated', token, name: user.name })
})

/* MOTORCYCLES ROUTES */
app.get('/:brand/motorcycles', async (request, response) => {
  const brand = request.params.brand

  const motorcyclesByBrand = await prisma.motorcycles.findMany({
    where: {
      brand,
      rent_by: ''
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.json(motorcyclesByBrand)
})

app.get('/motorcycles', login, async (request, response) => {
  const { user } = request?.loggedUser || {}
  if (!user || !user.id) return response.status(401).json({ error: 'Not authorized' }) 

  const motorcyclesByUser = await prisma.motorcycles.findMany({
    where: {
      rent_by: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.json(motorcyclesByUser)
})

app.put('/:brand/motorcycles/:id', login, async (request, response) => {
  const { user } = request?.loggedUser || {}
  const { id, brand } = request.params
  
  if (!user || !user.id) return response.status(401).json({ error: 'Not authorized' }) 

  const motorcycle = await prisma.motorcycles.findFirst({
    where: {
      id, brand
    },
  })
  if(!motorcycle) return response.status(400).json({ error: 'No motorcycle found'})
  const motorcycleToRent = {
    ...motorcycle,
    rent_by: user.id
  }

  await prisma.motorcycles.update({
    data: { ...motorcycleToRent },
    where: { id }
  })

   return response.status(200).json({ message: 'Motorycle has been rent' })
})

app.listen(3333)