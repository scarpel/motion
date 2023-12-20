import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { ECommentSort } from '../videos.types';
import { Transform, Type } from 'class-transformer';

export default class GetCommentsDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageSize: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(ECommentSort))
  sort: string;

  @IsBoolean()
  @Transform(({ value }) =>
    typeof value === 'boolean' ? value : value === 'true',
  )
  @IsOptional()
  asc: boolean;
}
