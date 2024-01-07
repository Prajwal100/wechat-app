import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTCONSTANTS } from "src/utils/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:JWTCONSTANTS.secret,
        });
    }

    async validate(payload:any){
        const {username,email,name,avatar} = payload;

        return {
            name,
            username,
            email,
            avatar,
        }

    }
}