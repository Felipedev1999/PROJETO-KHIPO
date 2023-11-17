import express from 'express'
import userController from './controller/user'
import projectController from './controller/project'

const app = express()

app.use(express.json())

app.use('/user', userController)
app.use('/project', projectController)

app.listen(3000, () => {
    console.log('server running on port 3000')
})
