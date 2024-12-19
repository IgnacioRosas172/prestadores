import { IsEmail, IsPhoneNumber, IsString, IsUrl, Length } from "class-validator";

export class CreateProfileDto {
  @IsString()
  @Length(3, 12)
  fullName: string;

  @IsString()
  @Length(10, 50)
  bio: string;
  organization;
  @Length(5, 100)
  title;
  @IsPhoneNumber()
  telephone;
  extension;
  @IsEmail()
  email;
  @IsUrl()
  website;

}
