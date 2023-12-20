import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreateCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  comment: string;

  @IsString()
  @IsOptional()
  parentCommentId: string;
}
