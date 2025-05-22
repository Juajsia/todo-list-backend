import { Task } from '../models/task.model.js'

export class TaskController {
  static async getAllTasks (req, res) {
    try {
      const tasks = await Task.findAll()
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving tasks', error })
    }
  }

  static async createTask (req, res) {
    try {
      const { title, description } = req.body
      const newTask = await Task.create({ title, description })
      res.status(201).json(newTask)
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error })
    }
  }

  static async updateTask (req, res) {
    try {
      const { id } = req.params
      const task = await Task.findByPk(id)
      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }
      task.set(req.body)
      await task.save()
      res.status(200).json(task)
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error })
    }
  }

  static async deleteTask (req, res) {
    try {
      const { id } = req.params
      const task = await Task.findByPk(id)
      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }
      await task.destroy()
      res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error })
    }
  }
}
