import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      loggedUser?: jwt.JwtPayload
    }
  }
}

export default (request: Request, response: Response, next: NextFunction): void => {
  try {
    const jwtSecret =  process.env.JWT_SECRET || ''
    const token = request?.headers?.authorization || ''
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload
    
    request.loggedUser = decoded
    next()
  } catch(error) {
    response.status(401).send({ message: 'Authentication error' })
  }
}