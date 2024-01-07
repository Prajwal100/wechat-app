import { Body, Controller, Get, HttpStatus, Post, Req,  UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CustomResponse } from 'src/utils/response.helper';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.register(createUserDto);
      return CustomResponse(
        true,
        'Successfuly registered new user.',
        newUser,
        HttpStatus.CREATED,
      );
    } catch (error) {
      return CustomResponse(false, error.message, [], HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() req):Promise<any>{
    return await this.authService.generateToken(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req:Request){
    return CustomResponse(true,"successfully fetched.",req.user,HttpStatus.OK);
  }

}
