import { IsEmail, IsPhoneNumber, IsString, IsUrl, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    @Length(3, 12)
    fullName: string;

    @ApiProperty()
    @IsString()
    @Length(10, 50)
    bio: string;

    @ApiProperty()
    @IsString()
    organization: string;

    @ApiProperty()
    @IsString()
    @Length(5, 100)
    title: string;

    @ApiProperty()
    @IsPhoneNumber()
    telephone: string;

    @ApiProperty()
    @IsString()
    extension: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsUrl()
    website: string;
}
