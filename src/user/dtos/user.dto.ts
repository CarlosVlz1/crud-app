import { IsEmail,  IsIn,  IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { USER_ROLE_TYPES, UserRoleTypes } from "./constants";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsNotEmpty()
    @IsIn(USER_ROLE_TYPES)
    role: UserRoleTypes;
}