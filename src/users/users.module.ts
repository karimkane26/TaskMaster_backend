/* eslint-disable prettier/prettier */
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TaskEntity } from 'src/tasks/entities/task.entity';
@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity,TaskEntity]),
    TypeOrmModule.forFeature([UserEntity,TaskEntity]),
    AuthModule, // Assurez-vous que le module contenant JwtService est importé
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
