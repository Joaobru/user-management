import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/user', UserController.index)
routes.get('/user/:id', UserController.getById)
routes.post('/user', UserController.store)
routes.put('/user/:id', UserController.updateUser)
routes.delete('/user/:id', UserController.deleteUser)
export default routes
