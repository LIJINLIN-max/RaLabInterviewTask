import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    Put,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Result } from '../../common/common/dto/result.dto';
import { ErrorCode } from '../../common/exception/error.code';


@Controller('tasks')
@ApiTags('Task Management')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Insert New Task' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    await this.taskService.create(createTaskDto);
    return new Result().ok();
  }



  @Get(':id')
  @ApiOperation({ summary: 'Find Task By Id' })
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(id);
    if (!task){
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        'There is No Such Task',
      )
    }
    return new Result<UpdateTaskDto>().ok(task);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Task Info' })
  async update(@Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.taskService.findOne(
      updateTaskDto.id + '',
    );
    if (!task) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        'There is No Such Task',
      );
    }
    await this.taskService.my_update(updateTaskDto);
    return new Result().ok();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete Task By Id' })
  async remove(@Param('id') id: string) {
    const task = await this.taskService.findOne(id);
    //console.log(task);
    if (!task) {
      
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        'Task is not existed',
      );
    }
    // task.delFlag = 1;
    // await this.taskService.update(task);
    await this.taskService.dElete(id);
    return new Result().ok();
  }
}
