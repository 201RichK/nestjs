import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/search-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilter(filterDto: GetTaskFilter): Task[] {
        const { status, search } = filterDto

        let tasks = this.getAllTasks()

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }

        return tasks
    }

    getTaskByID(id: string): Task {
        const found = this.tasks.find(task => task.id === id)
        if (!found) {
            // ...
            throw new NotFoundException(`Task with ${id} not found !!`)
        }

        return found
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        console.log(createTaskDto)
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task)
        return task
    }

    deleteTask(id: string): void {
        const found = this.getTaskByID(id)
        this.tasks = this.tasks.filter(task => task.id !== found.id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskByID(id)
        task.status = status
        return task
    }
}
