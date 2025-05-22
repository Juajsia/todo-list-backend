import { Task } from '../models/task.model.js'
import { create } from 'xmlbuilder2'

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

  static async createXML (req, res) {
    try {
      const tasks = await Task.findAll()
      if (tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found' })
      }

      const total = tasks.length
      const completed = tasks.filter(task => task.state === 'completed').length
      const percent = ((completed / total) * 100).toFixed(2)

      const root = create({ version: '1.0' })
        .ele('informe')

      root.ele('resumen')
        .ele('total').txt(total).up()
        .ele('completadas').txt(completed).up()
        .ele('porcentaje').txt(`${percent}%`).up()
        .up()

      const tareasEle = root.ele('tareas')
      tasks.forEach(task => {
        tareasEle.ele('tarea')
          .ele('id').txt(task.id).up()
          .ele('title').txt(task.title).up()
          .ele('description').txt(task.description).up()
          .ele('state').txt(task.state).up()
      })

      const xml = root.end({ prettyPrint: true })

      res.set('Content-Type', 'application/xml')
      res.send(xml)
    } catch (error) {
      console.error(error) // Importante para ver el error en consola
      return res.status(500).json({
        message: 'Error retrieving tasks',
        error: error.message || error.toString()
      })
    }
  }
}
