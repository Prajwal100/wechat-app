export type CreateUserDetail={
    name:string;
    email:string;
    password:string;
}

export type ValidateUserDetails={
    email:string;
    password:string;
}

export type FindUserParams=Partial<{
    id:number;
    email:string;
}>