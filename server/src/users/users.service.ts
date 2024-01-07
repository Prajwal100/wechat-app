import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { CreateUserDetail, FindUserParams } from 'src/utils/types';
import { User } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { hashPassword } from 'src/utils/helpers';
@Injectable()
export class UsersService implements IUserService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){

    }
    async createUser(userDetails:CreateUserDetail) {
        const existingUser=await this.userRepository.findOneBy({email:userDetails.email});

        if(existingUser)
            throw new HttpException('User already exists',HttpStatus.CONFLICT);
        const password=await hashPassword(userDetails.password);
        const newUser= this.userRepository.create({...userDetails,password});
        return this.userRepository.save(newUser);
    }

    async findUser(findUserParams: FindUserParams): Promise<User> {
        return this.userRepository.findOneBy(findUserParams);
    }
}
