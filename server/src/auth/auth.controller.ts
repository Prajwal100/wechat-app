import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUserService } from 'src/users/user';
import { instanceToPlain } from 'class-transformer'
import { LocalAuthGuard } from './utils/Guards';
@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        @Inject(Services.AUTH) private authService:IAuthService,
        @Inject(Services.USER) private userService:IUserService
        ){

    }

    @Post('register')
    async register(@Body() createUserDto:CreateUserDto){
        return instanceToPlain(await this.userService.createUser(createUserDto));
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(){

    }

    @Get('status')
    status(){

    }

    @Post('logout')
    logout(){

    }
}
