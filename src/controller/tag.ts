import express from 'express'
import TagService from '../service/tag'
import { tagRequestDto } from '../dto/tag'

var router = express.Router()

router.post('/', async (req, res)=> {
    try {
        const body = req.body as tagRequestDto
        await TagService.CreateTag(body)
        res.status(201).json({
            message: 'Tag created',
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Error on creating tag:' + error.message,
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const response = await TagService.getTagById(Number(id))

        res.json({
            message: 'Tag recovered',
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
        const taskId = req.params.id
        const tagId = req.params.id


        const response = await TagService.assignTagToTask(
            Number(tagId),
            Number(taskId)
        )

        res.json({
            message: 'Tag assign to task',
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