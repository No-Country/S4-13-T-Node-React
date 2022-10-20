import { ChildrenProp } from './index.d';
import { AxiosError, AxiosResponse } from 'axios';

export interface ChildrenProp {
  children: React.ReactNode;
}

export interface HCProps extends ChildrenProp {
  heading: string;
}

export interface SearchProp {
  text: string;
}

export interface MenuItem {
  text: String;
  icon?: React.ReactNode;
  href?: Url;
}

export interface TagProps {
  href?: Url | String;
  tag: String;
  other?: Boolean;
}

export interface OpensProps {
  open: Boolean;
}

export interface test {
  title: string;
}

export interface PostPropsAxios {
  post?: {
    title: string | null;
    mediaUrl: string | URL;
    tag: string;
  };
}

export interface CardPostProps {
  imageUrl: string;
  id: number;
  hrefPost?: IHrefPostProps;
  title?: string;
  author?: string;
  authorId: string | number;
}

export interface IHrefPostProps {
  pathname: string;
  query: { id: string | number };
}

export interface IPost {
  id: number;
  title?: string;
  media_url?: string;
  tags?: string[];
  likesCount?: number;
  comments?: IComment[];
  commentsCount?: number;
  created_at?: string;
  updated_at?: Date;
  deleted_at?: Date;
  user_id?: number;
  user?: {
    username: string;
    id: string | number;
  };
}

export interface IFav {
  post?: IPost;
}

export interface IComment {
  comment: string;
  created_at?: Date;
  id?: number;
  user: IUser;
  replys?: IReply[];
}

export interface IReply {
  reply: string;
  created_at: Date;
  id: number;
  user: IUser;
  replys?: IReply[];
}

export interface IUser {
  username: string;
  email: string;
  role?: string[];
  avatar_url?: string;
  total_likes?: number;
  post?: IPost[];
}

export interface ILike {
  post: IPost;
}

export interface AxiosGetPost extends AxiosResponse {
  data: {
    data: {
      posts: IPost[];
    };
  };
}

export interface AxiosGetPostById extends AxiosResponse {
  data: {
    data: {
      post: IPost;
    };
  };
}

export interface RegisterProps {
  username: string;
  email: string;
  password: string;
}

export interface APIResponseSuccess {
  data: APIResponse;
}

export interface RegisterResponseError {
  response: {
    data: APIResponse;
  };
}

export interface APIResponse {
  status: number;
  statusMsg: string;
  error?: any;
  data?: any;
}

export interface LoginProps {
  username?: string;
  email?: string;
  password: string;
}

export interface FormLinksProps {
  question: string;
  anchor: string;
  achorText: string;
}

export interface MDProps {
  social: string;
}

export interface GetUserData {
  access_token: string;
  refresh_token?: string;
  user: IUserLikes;
}
