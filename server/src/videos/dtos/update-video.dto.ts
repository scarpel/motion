import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export default class UpdateVideoDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsArray()
  @IsString({ each: true })
  @MaxLength(25, { each: true })
  @IsOptional()
  tags: string[];
}
