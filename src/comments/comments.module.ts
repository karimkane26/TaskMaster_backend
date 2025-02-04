/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
@Module({
  imports : [TypeOrmModule.forFeature([CommentEntity,TaskEntity])],
  controllers: [CommentsController],
  providers: [CommentService],
})
export class CommentsModule {}
