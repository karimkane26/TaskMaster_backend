/* eslint-disable prettier/prettier */
// src/users/users.service.ts
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/utility/common/user-roles.enum';  // Import de l'enum Roles
import { JwtService } from '@nestjs/jwt';
import { UserWithTokenDto } from './dto/user-with-token.dto';
import { UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TaskEntity } from 'src/tasks/entities/task.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,

    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>, // Repository pour les tâches
  
  ) {}
async getProfile(token: string): Promise<UserEntity> {
  try {
    // Vérifier et décoder le token
    const decoded = this.verifyToken(token);
    console.log(decoded);
    
    // Extraire l'ID utilisateur du payload
    const userId = decoded.id;
    console.log("user",userId);
    
    // Récupérer l'utilisateur depuis la base de données
    const user = await this.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new UnauthorizedException('Invalid or expired token');
  }
}


generateToken(user: UserEntity): string {
  return this.jwtService.sign({
    id: user.id, 
    role: user.role,
  });
}
 verifyToken(token: string): any {
    return this.jwtService.verify(token); // Renvoie les données du token (payload)
  }

async login(email: string, password: string): Promise<UserWithTokenDto> {
  const user = await this.usersRepository.findOne({ where: { email } });

  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // Générer un token lors de la connexion
  const token = this.generateToken(user);
  console.log(token);
  
  return { user, token };
}


  async createUser(createUserDto: CreateUserDto): Promise<UserWithTokenDto>  {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Création d'un utilisateur avec un rôle par défaut si nécessaire
    const user = this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role || Roles.User,  // Si aucun rôle n'est spécifié, on utilise 'User' par défaut
    });
      const savedUser = await this.usersRepository.save(user);
    // Sauvegarde de l'utilisateur
    const token = this.jwtService.sign({id: savedUser.id, role: savedUser.role});
    return { user: savedUser, token}
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number):Promise<UserEntity>  {
    return this.usersRepository.findOne({ where: { id } });
  }

  // async update(id: number, updateUserDto: Partial<UserEntity>) {
  //   await this.usersRepository.update(id, updateUserDto);
  //   return this.findOne(id);
  // }
  async update(id: number, updateUserDto: Partial<UserEntity>, token: string): Promise<UserEntity | null> {
  // Validation du token
  const decoded = this.verifyToken(token);
  if(!decoded){
    throw new UnauthorizedException('Invalid or expired token');
  }

  // Vérifiez si l'utilisateur du token correspond ou si le rôle est suffisant
  if(decoded.id !== id && !['admin', 'user'].includes(decoded.role)) {
    throw new UnauthorizedException('Unauthoorized action');

  }
  const user = await this.usersRepository.findOne({ where: { id } });
  if (!user) {
    return null;
  }

  // Mise à jour des informations de l'utilisateur
  Object.assign(user, updateUserDto);
  return this.usersRepository.save(user);
}


 async remove(id: number, token: string): Promise<UserEntity | null> {
  // Validation du token
  const decoded = this.verifyToken(token);
  if (!decoded) {
    throw new UnauthorizedException('Invalid or expired token');
  }

  // Vérifiez si l'utilisateur du token correspond ou si le rôle est suffisant
  if (decoded.id !== id && decoded.role !== 'admin') {
    throw new UnauthorizedException('Unauthorized action');
  }

  // Récupération de l'utilisateur par ID
  const user = await this.findOne(id);
  if (!user) {
    return null;
  }

  // Suppression de l'utilisateur
  await this.usersRepository.remove(user);
  return user;
}

async logout(token: string): Promise<{ message: string }> {
  try {
    // Valider le token
    const decoded = this.verifyToken(token);

    // Si nécessaire, gérer une liste noire de jetons invalidés (ex : Redis, base de données)
    console.log(`User ${decoded.id} has logged out.`);

    // Retourner une confirmation
    return { message: 'Logout successful' };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new UnauthorizedException('Invalid or expired token');
  }
}

async addTask(userId: number, createTaskDto: CreateTaskDto): Promise<TaskEntity> {
  const user = await this.usersRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new NotAcceptableException('User not found');
  }

  const newTask = this.taskRepository.create({
    ...createTaskDto,
    user, // Lier la tâche à l'utilisateur
  });

  return this.taskRepository.save(newTask);
}


}
