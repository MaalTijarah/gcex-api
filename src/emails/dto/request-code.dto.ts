import { IsEmail, IsNotEmpty } from "class-validator";

export class RequestCodeDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}