import { Injectable, Inject } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Services } from 'src/utils/constants';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(@Inject(Services.AUTH) private readonly authService:AuthService){
        super({usernameField:'email'})
    }

    async validate(email:string,password:string){
        return true;
        // const result=this.authService.validateUser({email,password});
    }
}