/* eslint-disable prettier/prettier */
// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Roles } from 'src/utility/common/user-roles.enum';  // Assurez-vous que l'enum est bien importé
import { TaskEntity } from 'src/tasks/entities/task.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.User })
  role: Roles;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
