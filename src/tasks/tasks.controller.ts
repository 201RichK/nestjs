import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/search-task.dto';
import { TaskStatusValidation } from './pipes/task-status-validation';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDtO: GetTaskFilter): Task[] {
        if (Object.keys(filterDtO).length) {
            return this.taskService.getTaskWithFilter(filterDtO);
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Task {
        return this.taskService.getTaskByID(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    upateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidation) status: TaskStatus,
    ): Task {
        return this.taskService.updateTaskStatus(id, status);
    }
}
