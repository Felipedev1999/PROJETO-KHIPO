import { prisma } from '../db'
import { ProjectRequestDto } from '../dto/project'

async function createProject(data: ProjectRequestDto) {
    const project = await prisma.project.create({
        data:{
            name: data.name,
            description: data.description,
        }
    })

    return project
}

async function assignMemberToProject(projectId: number, userId: number) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    })

    if (!project) {
        throw new Error('Project not found')
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!user) {
        throw new Error('User not found')
    }

    const projectMember = await prisma.projectMembers.create({
        data: {
            user_id: userId,
            project_id: projectId,
        },
    })

    return projectMember
}

async function getProjectById(id: number) {
    const project = await prisma.project.findUnique({
        where: {
            id: id,
        },
        include: {
            members: {
                include: {
                    user: true,
                },
            },
        },
    })

    if (!project) {
        throw new Error('Project not found')
    }

    return project
}

export default {
    createProject,
    getProjectById,
    assignMemberToProject,
}
