/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Get,
  Param,
  NotAcceptableException,
  UseGuards,
  Request,
  Req,
  HttpCode,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithTokenDto } from './dto/user-with-token.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  
 async getTasksForUser(userId: number) {
    return this.taskRepository.find({
      where: { user: { id: userId } },  // Correctement lié à la relation 'user'
    });
  }


  
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserWithTokenDto> {
    return this.usersService.createUser(createUserDto);
  }
@Post('login')
async login(@Body() loginUserDto: LoginUserDto, @Request() req: any): Promise<{ message: string }> {
  const userWithToken = await this.usersService.login(loginUserDto.email, loginUserDto.password);
   

  const token = this.usersService.generateToken(userWithToken.user);
  // console.log(token);
  
  
  // Écrire le token dans un cookie sécurisé
  req.res.cookie('jwt', token, {
    httpOnly: true,  // Le cookie n'est pas accessible via JavaScript côté client
    secure: true,    // Transmettre uniquement sur HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 24 heures
  });

  return { message: 'Login successful' };
}



@UseGuards(JwtAuthGuard)
@Get('profile')
async getProfile(@Req() req: Request): Promise<UserEntity> {
    const userId = req['user'].id; // Récupérer l'ID utilisateur depuis le guard
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new NotAcceptableException('User not found');
    }

    return user;
  }




  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotAcceptableException(`User not found`);
    }
    return user;
  }

 @UseGuards(JwtAuthGuard)
@Patch(':id')
async update(
  @Param('id') id: number,
  @Body() updateUserDto: UpdateUserDto,
  @Request() req: any,
) {
  console.log('Authorization Header:', req.headers.authorization); // Debug
    console.log('Authenticated User ID:', req.user.id);
  // Extraire le token depuis le header Authorization
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new NotAcceptableException('Authorization token is missing');
  }

  // Mise à jour de l'utilisateur via le service
  const updatedUser = await this.usersService.update(id, updateUserDto, token);
  if (!updatedUser) {
    throw new NotAcceptableException(`User with ID ${id} not found`);
  }

  return updatedUser;
}





  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req: any) {
    
   if (req.user.id !== id && !['admin', 'user'].includes(req.user.role)) {
  throw new NotAcceptableException(`You are not authorized to delete this user`);
}

    const result = await this.usersService.remove(id, req.headers.authorization.split(' ')[1]);
    if (!result) {
      throw new NotAcceptableException(`User with ID ${id} not found or already deleted`);
    }

    return { message: `User with ID ${id} deleted successfully` };
  }

  // déconnexion
  
@Post('logout')
@HttpCode(200)
async logout(@Req() req: any, @Res({ passthrough: true }) res: any): Promise<{ message: string }> {
  const token = req.headers.authorization?.split(' ')[1]; // Extraire le token du header Authorization
  if (!token) {
    throw new UnauthorizedException('Authorization token is missing');
  }

  try {
    // Optionnel : Valider ou loguer l'utilisateur se déconnectant
    const decoded = this.usersService.verifyToken(token);
    console.log(`User ${decoded.id} has logged out.`);

    // Effacer le cookie JWT
   // Supprimer le cookie contenant le JWT
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true, // Assurez-vous d'utiliser HTTPS
    });

    return { message: 'Logout successful' };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new UnauthorizedException('Invalid or expired token');
  }
}
@UseGuards(JwtAuthGuard)
@Post(':id/tasks')
async addTask(
  @Param('id') userId: number,
  @Body() createTaskDto: CreateTaskDto,
): Promise<TaskEntity> {
  return this.usersService.addTask(userId, createTaskDto);
}


}

