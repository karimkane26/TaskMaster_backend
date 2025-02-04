/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TaskEntity } from './entities/task.entity';
// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(TaskEntity)
//     private readonly taskRepository: Repository<TaskEntity>,
//   ) {}

//   findAll(): Promise<TaskEntity[]> {
//     return this.taskRepository.find();
//   }

//   findOne(id: number): Promise<TaskEntity> {
//     return this.taskRepository.findOne({ where: { id } });
//   }

//   create(task: Partial<TaskEntity>): Promise<TaskEntity> {
//     const newTask = this.taskRepository.create(task);
//     return this.taskRepository.save(newTask);
//   }

//   async update(id: number, task: Partial<TaskEntity>): Promise<TaskEntity> {
//     await this.taskRepository.update(id, task);
//     return this.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     await this.taskRepository.delete(id);
//   }

//    async getUserTasks(userId: number): Promise<TaskEntity[]> {
//     return this.taskRepository.find({
//       where: { user: { id: userId } },
//       relations: ['user'],  // Permet de récupérer aussi les informations de l'utilisateur associé
//     });
//   }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async create(createTaskDto: { title: string; description: string; status: TaskStatus }) {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async updateStatus(id: number, status: TaskStatus) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    task.status = status;
    return this.taskRepository.save(task);
  }
}
