import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';



@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    // Insert
    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.tasksRepository.save(createTaskDto);
    }

    // Find by Id
    async findOne(id: string): Promise<Task> {
        return await this.tasksRepository.findOne(id);
    }


    // async findByTitle(title: string, id: string): Promise<Task> {
    //     const condition = { title: title };
    //     if (id) {
    //         condition['id'] = Not(id);
    //     }
    //     return await this.tasksRepository.findOne(condition);
    // }

    


    async my_update(task:UpdateTaskDto): Promise<void>
    {
        await this.tasksRepository.update({id: task.id}, {status: task.status, title: task.title, description:task.description});
    }

    async dElete(id:string): Promise<Task>
    {
        await this.tasksRepository.delete(id);
        return await this.tasksRepository.findOne(id);
    }
}