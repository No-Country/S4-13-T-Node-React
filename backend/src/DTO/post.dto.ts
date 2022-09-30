import { IPostDTO } from '../Interfaces/post.interfaces'
import { IsNotEmpty, IsNumber, IsString, IsUrl, MinLength } from 'class-validator'

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
  mediaURL: string

  @IsNumber()
  @IsNotEmpty()
  user_id: number
}
