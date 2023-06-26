import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
const routes = require('./routes')

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

app.listen(3333)