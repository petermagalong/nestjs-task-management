import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.taskService.getTasksWithFilters(filterDto);
        }else {
            return this.taskService.getAllTasks();
        }
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task{
        return this.taskService.getTaskById(id);
    }

    @Delete(':id')
    deleteTaskById(@Param('id') id: string):Task []{
         return this.taskService.deleteTaskById(id);
    }

    /*
    can also call on this approach
        @Body('title') title:string,
        @Body('description') description:string
    */
    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(CreateTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(
    @Param('id') id:string,
    @Body('status') status:TaskStatus): Task{
        return this.taskService.updateTaskStatus(id,status)
    }


}
