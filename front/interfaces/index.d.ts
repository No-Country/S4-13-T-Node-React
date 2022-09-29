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

interface PostPropsAxios {
  obj?: {
    username: string;
    content: String | URL;
    date: Date;
  };
}
