import express from 'express'
import TaskService from '../service/task'
import { taskRequestDto } from '../dto/task'

var router = express.Router()

router.post('/', async (req, res) => {
    try {
        const body = req.body as taskRequestDto
        await TaskService.createTask(body)
        res.status(201).json({
            message: 'Task created',
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Error on creating task:' + error.message,
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const response = await TaskService.getTaskById(Number(id))

        res.json({
            message: 'Task recovered',
            data: response,

        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Error getting task:' + error.message,
        })
    }
})

router.post('/:id/assign', async (req, res) => {
    try {
        const projectId = req.params.id
        const taskId = req.params.id

        const response = await TaskService.assignTaskToProject(
            Number(projectId),
            Number(taskId)
        )

        res.json({
            message: 'Task assign to project',
            data: response,
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Error fetching project:' + error.message,
        })
    }
})

router.put('/:id', (req, res) => {
    res.json({
        message: 'Updated successfully',
    })
})

router.delete('/:id', (req, res) => {
    res.json({
        message: 'user deleted',
    })
})

export default router