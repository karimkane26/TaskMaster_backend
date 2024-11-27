/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, TasksModule, AuthModule],
})
export class AppModule {}
