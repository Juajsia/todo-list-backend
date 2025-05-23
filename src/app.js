import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { taskRouter } from './routes/task.route.js'

export const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', taskRouter)
