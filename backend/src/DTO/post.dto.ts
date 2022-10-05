import { IPostDTO } from '../Interfaces/post.interfaces'
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'
import { BaseDTO } from './base.dto'
import { User } from '../Entities/user.entity'

export class PostDTO extends BaseDTO implements IPostDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  title: string

  @IsArray()
  @IsNotEmpty()
  tags: string[]

  @IsUrl()
  @IsNotEmpty()
  media_url: string

  @IsNumber()
  @IsNotEmpty()
  user: User
}

const sort = ['asc', 'ASC', 'desc', 'DESC']

export class getPostRequest {
  @IsOptional()
  // @IsNumberString()
  @Min(1)
  page: any

  @IsOptional()
  // @IsNumberString()
  @Min(1)
  size: any

  @IsOptional()
  @MinLength(3)
  @MaxLength(4)
  @IsIn(sort)
  sort: any
}

export class updatePostRequest {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  title: any

  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  tag: any
}
