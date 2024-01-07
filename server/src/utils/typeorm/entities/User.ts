import { Exclude } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    username:string

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    @Exclude()
    password:string

}