import { TaskController } from '../controllers/task.controller.js'
import { Router } from 'express'

export const taskRouter = Router()
taskRouter.get('/tasks', TaskController.getAllTasks)
taskRouter.post('/tasks', TaskController.createTask)
taskRouter.put('/tasks/:id', TaskController.updateTask)
taskRouter.delete('/tasks/:id', TaskController.deleteTask)
// taskRouter.get('/tasks/:id', TaskController.getTaskById)
