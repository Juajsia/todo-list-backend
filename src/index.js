import { app } from './app.js'
import { sequelize } from './db/conecction.js'
import './models/task.model.js'
import 'dotenv/config'

const port = process.env.PORT || 3000

try {
  await sequelize.authenticate()
  // await sequelize.sync({ force: false })
  console.log('Connection has been established successfully.')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
} catch (error) {
  console.error('Error connecting to the database', error)
}
