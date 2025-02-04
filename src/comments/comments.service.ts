/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  // Créer un commentaire
  async create(taskId: number, user: string, message: string): Promise<CommentEntity> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const comment = this.commentRepository.create({ user, message, task });
    return this.commentRepository.save(comment);
  }

  // Récupérer tous les commentaires
  async findAll(): Promise<CommentEntity[]> {
    return this.commentRepository.find({ relations: ['task'], order: { timestamp: 'DESC' } });
  }

  // Récupérer un commentaire spécifique
  async findOne(id: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['task'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  // Mettre à jour un commentaire
  async update(id: number, message: string): Promise<CommentEntity> {
    const comment = await this.findOne(id);
    comment.message = message;
    return this.commentRepository.save(comment);
  }

  // Supprimer un commentaire
  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);
  }
}
