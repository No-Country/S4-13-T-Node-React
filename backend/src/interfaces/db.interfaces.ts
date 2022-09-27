export interface IPost {
  id: number;
  title: string;
  mediaURL: string;
  likesCount: number;
  commentsCount: number;
  tag: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
