import express from 'express'
import ProjectService from '../service/project'
import { ProjectRequestDto } from '../dto/project'

var router = express.Router()

router.post('/', async (req, res) => {
    try {
        const body = req.body as ProjectRequestDto
        await ProjectService.createProject(body)
        res.status(201).json({
            message: 'Project created successfully',
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Error on creating user:' + error.message,
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const response = await ProjectService.getProjectById(Number(id))

        res.json({
            message: 'User recovered',
            data: response,
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Error fetching user:' + error.message,
        })
    }
})

router.post('/:id/assign', async (req, res) => {
    try {
        const projectId = req.params.id
        const userId = req.body.user_id

        const response = await ProjectService.assignMemberToProject(
            Number(projectId),
            Number(userId)
        )

        res.json({
            message: 'User assigned to project',
            data: response,
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Error fetching user:' + error.message,
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
