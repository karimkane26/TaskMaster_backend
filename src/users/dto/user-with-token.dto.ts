/* eslint-disable prettier/prettier */
// src/users/dto/user-with-token.dto.ts
import { UserEntity } from '../entities/user.entity';

export class UserWithTokenDto {
  user: UserEntity;
  token: string;
}
