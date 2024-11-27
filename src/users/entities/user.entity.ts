/* eslint-disable prettier/prettier */
// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { Roles } from 'src/utility/common/user-roles.enum';  // Importation de l'enum Roles
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

  @Column({ type: 'enum', enum: Roles, default: Roles.User })  // Utilisation de l'enum Roles pour le champ role
  role: Roles;  // Rôle de l'utilisateur (enum)
   @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];  
  updatedAt: any;
  createdAt: any;
}
