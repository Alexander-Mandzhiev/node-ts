import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsString()
    readonly name!: string;
    @IsNumber()
    readonly age!: number;
}