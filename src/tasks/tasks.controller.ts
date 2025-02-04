/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { TasksService } from './tasks.service';
// import { TaskEntity } from './entities/task.entity';

// @Controller('tasks')
// export class TasksController {
//   constructor(private readonly tasksService: TasksService) {}

//   @Get()
//   findAll(): Promise<TaskEntity[]> {
//     return this.tasksService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<TaskEntity> {

//     return this.tasksService.findOne(+id);
//   }

//   @Post('addtask')
//   create(@Body() task: Partial<TaskEntity>): Promise<TaskEntity> {
//     return this.tasksService.create(task);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() task: Partial<TaskEntity>): Promise<TaskEntity> {
//     return this.tasksService.update(+id, task);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.tasksService.remove(+id);
//   }

//    @Get('user/:id')
//   async getUserTasks(@Param('id') userId: number) {
//     // Appel de la méthode pour récupérer les tâches de l'utilisateur avec l'ID spécifié
//     const tasks = await this.tasksService.getUserTasks(userId);
    
//     // Si aucune tâche n'est trouvée, vous pouvez gérer cette situation selon votre logique
//     if (!tasks) {
//       return { message: 'No tasks found for this user.' };
//     }

//     return tasks;
//   }
// }


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @Post('addtask')
  async create(@Body() createTaskDto: { title: string; description: string; status: TaskStatus }) {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() updateDto: { status: TaskStatus }) {
    return this.tasksService.updateStatus(+id, updateDto.status);
  }
}
