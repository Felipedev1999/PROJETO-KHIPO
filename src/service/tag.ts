import { prisma } from '../db'
import { tagRequestDto } from "../dto/tag";
import { Tag } from '@prisma/client';

async function createTag(data: tagRequestDto): Promise <Tag> {
    const tag = await prisma.tag.create({
        data: {
            title: data.title,
            id: data.id,
            tag: data
        }

    })
    if(!tag){
        throw new Error('Tag not fund')
    }

    return tag
}

async function assignTagToTask(tagId: number, taskId:number){
    const tag = await prisma.tag.findUnique({
        where:{
            id: tagId,
        }
    })

    if(!tag){
        throw new Error('Tag not assign')
    }

    const project = await prisma.project.findUnique({
        where: {
            id: taskId,
        },
    })

    if (!project) {
        throw new Error('Task not found')
    }

    const Tag = await prisma.task.create({
        data: {
            task_id : taskId,
    },
    })

    return tag
}

async function getTagById(id:number) {
    const tag = await prisma.tag.findUnique({
        where: {
            id: id,
        }
    })

    if (!tag){
        throw new Error ('User not fund');
    }
    
    return tag
}

export default{
    createTag,
    assignTagToTask,
    getTagById,
}

