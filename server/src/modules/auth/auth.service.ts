import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { compareHash } from 'src/utils/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService:JwtService
    ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async validateUser(usernameOrEmail:string,pass:string):Promise<any>{
    const user = await this.usersService.findByUsernameOrEmail(usernameOrEmail);
    if(!user) throw new NotFoundException(`User not found with ID ${usernameOrEmail}`);

    if(!(await compareHash(pass,user.password))) throw new UnauthorizedException()

    const {password , ...result} = user;

    return result;

}

async generateToken(user:any){

  const userDetails = await this.usersService.findByUsernameOrEmail(user.username);
    const {username,email,name,avatar} = userDetails;
    const payload = {
        username,
        name,
        email,
        avatar,
    }

    return {
        access_token:this.jwtService.sign(payload),
    }
}
}
