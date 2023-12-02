import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {EntityManager,DataSource} from 'typeorm'
import { CreateUserDto } from './dto/create-user-dto';
import { UserEntity } from 'src/db/entities/user-entity';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
    private manager : EntityManager
    constructor(
        @Inject('DataSource')
        private dataSource:DataSource
    ){
        this.manager=this.dataSource.manager;
    }

    //create user
    async createUser(data:CreateUserDto){
        try{
            const user = await this.manager.findOneBy(UserEntity,{email:data.email})

            if(user){
                throw new Error('User already exists,go to login')
            }

            const createUser = await this.manager.create(UserEntity,{
                email:data.email,
                name:data.name,
                password:data.password,
                mobile:data.mobile,
                gender:data.gender,
                date_of_birth:data.date_of_birth
            })
            await this.manager.save(UserEntity,createUser)

            return {message : 'user created successfully', createUser}
        }catch(error){
            throw new NotFoundException(`${error.message}`)
        }
    }

    //update user

    async updateUser(id: string, data: UpdateUserDto) {
        try {
            const user = await this.manager.findOneBy(UserEntity, { email: data.email });
    
            if (!user) {
                throw new Error('User not found');
            }
    
            user.email = data.email;
            user.name = data.name;
            user.password = data.password;
            user.mobile = data.mobile;
            user.gender = data.gender;
            user.date_of_birth = data.date_of_birth;
    
            await this.manager.update(UserEntity,id,user);
            return { message: "User updated successfully" };
        } catch (error) {
            throw new NotFoundException(`${error.message}`);
        }
    }
    

    //delete user
    async deleteUser(id:string){
        try{
            const user = await this.manager.findOneBy(UserEntity,{id})

            if(!user){
                throw new Error('User is not found')

            }
            await this.manager.delete(UserEntity,id)
            return 'user deleted successfully'
        }catch(error){
            throw new Error(`$(error.message)`)
        }
    }

    //getAll user

    async getAllUser(){
        try{
            const user = await this.manager.find(UserEntity)

            if(user.length==0){
                throw new Error('Data is not found')
            }
            return {message:'Get Data Successfully',data:user}
        }catch(error){
            throw new NotFoundException(`$error.message`)
        }
    }

    //get user by id

    async getUserById(id:string){
        try{
            const user = await this.manager.findOneBy(UserEntity,{id})

            if(!user){
                throw new Error('Data is not found')
            }
            return {message:'Get Data Successfully',data:user}
        }catch(error){
            throw new NotFoundException(`$error.message`)
        }
    }
}
