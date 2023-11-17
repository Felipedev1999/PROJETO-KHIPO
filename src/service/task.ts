import { prisma } from "../db";
import { taskRequestDto } from "../dto/task";
import { Task } from "@prisma/client";

async function createTask(data: taskRequestDto): Promise<Task> {
    const task = await prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            status: data.status,
            project: data.project,
        }
    })

    if(!task){
        throw new Error('Task not fund')
    }

    return task
}

async function assignTaskToProject(taskId:number, projectId: number){
    const task = await prisma.task.findUnique({
        where:{
            id: taskId,
        }
    })

    if(!task){
        throw new Error('Task not assign')
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    })

    if (!project) {
        throw new Error('Project not found')
    }

    const Task = await prisma.task.create({
        data: {
            project_id: projectId,  
        },

    })

    return Task
}



async function getTaskById(id:number) {
    const task = await prisma.task.findUnique({
        where: {
            id: id,
        }
    })

    if (!task){
        throw new Error ('User not fund');
    }
    
    return task
}

export default{ 
    createTask,
    assignTaskToProject,
    getTaskById,
}

