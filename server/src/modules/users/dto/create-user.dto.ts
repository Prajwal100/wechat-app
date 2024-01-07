import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { GENDER, STATUS } from "src/utils/constants"

export class CreateUserDto{
    id:number

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    username:string

    @IsString()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsOptional()
    avatar:string

    @IsOptional()
    @IsEnum(GENDER)
    gender:GENDER

    @IsEnum(STATUS)
    @IsNotEmpty()
    status:STATUS=STATUS.Active
}