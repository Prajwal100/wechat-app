import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IAuthService } from './auth';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/user';
import { ValidateUserDetails } from 'src/utils/types';
import { compareHash } from 'src/utils/helpers';

@Injectable()
export class AuthService implements IAuthService{
    constructor(
        @Inject(Services.USER) private readonly userService:IUserService
    ){

    }
    async validateUser(userDetails:ValidateUserDetails) {
        const user= await this.userService.findUser({email:userDetails.email});
        if(!user)
            throw new HttpException("Invalid credentials",HttpStatus.UNAUTHORIZED);

        return compareHash(userDetails.password,user.password);
    }
}
