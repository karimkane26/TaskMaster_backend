/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
