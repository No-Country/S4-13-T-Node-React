import { Request, Response } from 'express'
import { ConfigServer } from '../Config/config'
import { CommentService } from '../Services/comment.service'
import { PostService } from '../Services/post.service'
import { HttpResponse } from '../Utils/http.response'

export class CommentController extends ConfigServer {
  constructor(
    private readonly commentService: CommentService = new CommentService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
    private readonly postService: PostService = new PostService()
  ) {
    super()
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { comment, error } = await this.commentService.delete({ id })

      if (error) return this.httpResponse.BadRequest(res, error)

      const post = await this.postService.find({ id: comment[0].post_id })
      await this.postService.update({ id: comment[0].post_id }, { commentsCount: post?.commentsCount! - 1 })
      return this.httpResponse.Ok(res, comment[0])
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }
}