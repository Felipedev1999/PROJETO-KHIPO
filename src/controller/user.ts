import express from 'express'
import UserService from '../service/user'
import { UserRequestDto } from '../dto/user'

var router = express.Router()

router.post('/', async (req, res) => {
    try {
        const body = req.body as UserRequestDto
        await UserService.createUser(body)
        res.status(201).json({
            message: 'User created',
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Error on creating user:' + error.message,
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    const response = await UserService.getUserById(Number(id))

    res.json({
        message: 'User recovered',
        data: response,
    })
})

router.get('/', async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const response = await UserService.getUsers(Number(page), Number(limit))

    res.json({
        message: 'Users retrieved',
        data: response,
    })
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
