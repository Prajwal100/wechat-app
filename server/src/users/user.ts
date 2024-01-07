import { User } from "src/utils/typeorm";
import { CreateUserDetail, FindUserParams } from "src/utils/types";

export interface IUserService{
    createUser(userDetails:CreateUserDetail):Promise<User>;
    findUser(findUserParams:FindUserParams):Promise<User>;
}