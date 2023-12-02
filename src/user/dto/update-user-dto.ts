import { Transform } from "class-transformer";
import {IsNotEmpty,IsString,IsEmail} from 'class-validator'

export class UpdateUserDto{
    @IsString()
    name?:string;

    @IsEmail()
    email?:string;

    @IsString()
    password?:string;

    @IsString()
    mobile?:string;

    @IsString()
    gender?:string;

    @Transform(({value})=>value && new Date(value))
    date_of_birth?:Date;
}