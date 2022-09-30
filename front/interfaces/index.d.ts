import { AxiosResponse } from 'axios';

export interface ChildrenProp {
  children: React.ReactNode;
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

export interface PostPropsAxios {
  post?: {
    title: string | null;
    mediaUrl: string | URL;
    tag: string;
  };
}

export interface CardPostProps {
  imageUrl: string;
  author: string;
  score?: number;
  title?: string;
  hrefPost?: {pathname: string, query:{id: string | number}};
}

export interface IPost {
  id: number;
  title: string;
  mediaURL: string;
  tag: string;
  likesCount: number;
  commentsCount: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  user_id?: number;
}

export interface AxiosGetPost extends AxiosResponse {
  data: {
    posts: IPost[];
  };
}

export interface AxiosGetPostById extends AxiosResponse {
  data: {
    post: IPost
  }
}

export interface RegisterProps {
  username: string;
  email: string;
  password: string;
}
export interface LoginProps {
  username?: string;
  email: string;
  password: string;
}
