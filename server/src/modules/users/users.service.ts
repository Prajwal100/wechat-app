import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: [
          {
            username: usernameOrEmail,
          },
          {
            email: usernameOrEmail,
          },
        ],
      });

      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email } = createUserDto;
      const isExist = await this.findByUsernameOrEmail(email);

      if (isExist) {
        throw new Error(`User already existed with email ID ${email}`);
      }

      await this.userRepository.save(createUserDto);

      return this.findByUsernameOrEmail(email);
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }
}
