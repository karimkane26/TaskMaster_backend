/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentService) {}

  // Créer un nouveau commentaire
  @Post(':taskId')
  async create(
    @Param('taskId') taskId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { user, message } = createCommentDto;
    return this.commentsService.create(taskId, user, message);
  }

  // Récupérer tous les commentaires
  @Get()
  async findAll() {
    return this.commentsService.findAll();
  }

  // Récupérer un commentaire par son ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  // Mettre à jour un commentaire
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const { message } = updateCommentDto;
    return this.commentsService.update(id, message);
  }

  // Supprimer un commentaire
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.commentsService.remove(id);
    return { message: `Comment with ID ${id} has been deleted` };
  }
}
