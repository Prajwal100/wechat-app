import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    username:string
    
    @IsNotEmpty()
    @MaxLength(20)
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password:string;

}