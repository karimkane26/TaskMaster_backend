/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne  } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })  // Valeur par défaut de la date actuelle
  dueDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks,{ onDelete: 'CASCADE' })  // Relation ManyToOne avec l'entité User
  user: UserEntity;
}
