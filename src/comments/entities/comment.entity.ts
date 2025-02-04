/* eslint-disable prettier/prettier */

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { TaskEntity } from 'src/tasks/entities/task.entity';
  
  @Entity('comments')
  export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user: string;
  
    @Column()
    message: string;
  
    @CreateDateColumn()
    timestamp: Date;
  
    @ManyToOne(() => TaskEntity, (task) => task.comments, { onDelete: 'CASCADE' })
    task: TaskEntity;
  }
  