import { Request, Response } from 'express'
import { prisma } from '../server'

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

interface CreateMotorcycleRequest extends Request { 
  name: string
  brand: string
  displacement: string
  rate: number          
  price: number
  image: string         
  cv: string
  weigth: string
  fuel: number
  location: string
  description: string
}

const isValidBrand = (brand: string) => ['Kawasaki', 'Yamaha', 'Honda', 'BMW', 'Suzuki', 'Triumph'].includes(brand)

module.exports = {
  async create(request: CreateMotorcycleRequest, response: Response) {
    const { name, brand, displacement, rate, price, image, cv, weigth, fuel, location, description } = request.body
    if(!name || !brand || !displacement || !rate || !price || !image || !cv || !weigth || !fuel || !location || !description) return response.status(400).json({ error: 'Bad request'})
    
    if (!isValidBrand(brand)) return response.status(400).json({ error: 'Invalid brand' })

    await prisma.motorcycles.create({
      data: { name, brand, displacement, rate, price, image, cv, weigth, fuel, location, description, rent_by: '' }
    })
  
    return response.status(201).json({ message: 'Motorcycle has been created'})
  },

  async index(request: LoggedRequest, response: Response) {
    const { brand, myMotorcycles } = request.query
    const { user } = request.loggedUser || {}
    if (!user || !user.id) return response.status(401).json({ error: 'Not authorized' }) 

    let motorcycles = []

    if (brand) {
      motorcycles = await prisma.motorcycles.findMany({
        where: {
          brand: brand.toString(),
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else if (myMotorcycles) { 
      motorcycles = await prisma.motorcycles.findMany({
        where: {
          rent_by: user.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      motorcycles = await prisma.motorcycles.findMany({
        orderBy: {
          brand: 'desc'
        }
      })
    }  
    return response.json(motorcycles)
  },
  
  async update(request: LoggedRequest, response: Response) {
    const { user } = request.loggedUser || {}
    const { id } = request.params
    
    if (!user || !user.id) return response.status(401).json({ error: 'Not authorized' }) 
  
    const motorcycle = await prisma.motorcycles.findFirst({
      where: {
        id
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
  },

  async delete(request: LoggedRequest, response: Response) {
    const { user } = request.loggedUser || {}
    const { id } = request.params
    
    if (!user || !user.id) return response.status(401).json({ error: 'Not authorized' }) 
  
    const motorcycle = await prisma.motorcycles.findFirst({
      where: {
        id
      },
    })
    if(!motorcycle) return response.status(400).json({ error: 'No motorcycle found'})

    await prisma.motorcycles.delete({
      where: { id }
    })
  
     return response.status(200).json({ message: 'Motorycle has been removed' })
  },
}