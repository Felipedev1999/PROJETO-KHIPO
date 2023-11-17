import { prisma } from '../db'
import { UserRequestDto } from '../dto/user'
import { User } from '@prisma/client'

async function createUser(data: UserRequestDto): Promise<User> {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
        },
    })

    return user
}

async function getUserById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })

    if (!user) {
        throw new Error('User not found')
    }

    return user
}

async function getUsers(page?: number, limit?: number): Promise<User[]> {
    let query = {};

    if(page && limit) {
        query = { skip: (page - 1) * limit, take: limit }
    }

    const users = await prisma.user.findMany(query)

    return users
}


async function updateUser(userId:number, userData: UserRequestDto) {
    const user = prisma.user.update({
      where: { 
        id:userId,
        data: userData
    },
    })
    return user
  };

async function deleteUser(userId: number) {
    const user = prisma.user.delete({
      where: { id: userId },
    });
    return user 
}

export default {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
}
