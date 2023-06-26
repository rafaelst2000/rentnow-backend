import express from 'express'

const routes = express.Router()
const UsersController = require('./controllers/UsersController')
const MotorcyclesController = require('./controllers/MotorcyclesController')
const SessionsController = require('./controllers/SessionsController')
import login from './middleware/login'


/* SESSION ROUTES */
routes.post('/sessions', SessionsController.login)

/* USERS ROUTES */
routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.index)
routes.post('/users', UsersController.create)
routes.put('/users', login, UsersController.update)
routes.delete('/users', login, UsersController.delete)

/* MOTORCYCLES ROUTES */
routes.get('/motorcycles', login, MotorcyclesController.index)
routes.post('/motorcycles', login, MotorcyclesController.create)
routes.put('/motorcycles/:id', login, MotorcyclesController.update)
routes.delete('/motorcycles/:id', login, MotorcyclesController.delete)

module.exports = routes