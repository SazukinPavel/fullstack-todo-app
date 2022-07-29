import {IsString, MaxLength } from "class-validator"

export class UpdateTodoDto{
    
    @IsString()
    @MaxLength(20)
    title:string
    
    @IsString()
    @MaxLength(100)
    description:string
}