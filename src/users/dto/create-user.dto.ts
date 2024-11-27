/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString,IsEmail,IsOptional} from "class-validator";
import { Roles } from "src/utility/common/user-roles.enum";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  email:string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsOptional()
  role?: Roles; 
}
