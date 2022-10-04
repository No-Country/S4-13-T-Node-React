import { IPostDTO } from '../Interfaces/post.interfaces'
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, Min, MinLength } from 'class-validator'

export class PostDTO implements IPostDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  title: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  tag: string

  @IsUrl()
  @IsNotEmpty()
  media_url: string

  @IsNumber()
  @IsNotEmpty()
  user_id: number
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
