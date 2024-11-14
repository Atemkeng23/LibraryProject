import { IsString, IsOptional } from 'class-validator';

export class CreateAuthorDto {
 // @IsString()
  firstName: string;

 // @IsString()
  lastName: string;
}

export class UpdateAuthorDto {
  //@IsString()
  @IsOptional()
  firstName?: string;

  //@IsString()
  @IsOptional()
  lastName?: string;

  //@IsString()
  @IsOptional()
  photoUrl?: string;

  @IsString()
  @IsOptional()
  biography?: string;
}