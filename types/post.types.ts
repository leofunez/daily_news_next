export interface PostType {
  index?: number;
  isFeatured?: boolean;
  isHorizontal?: boolean;
  hideImage?: boolean;
  hideCategory?: boolean,
  isSmall?: boolean;
  id: number;
  link: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  category_slug: string;
  video_field?: string;
  thumbnail_featured: string;
  thumbnail_medium: string;
}

export interface PostResponseType {
  id: number;
  title: {
    rendered: string
  };
  date: string;
  _embedded: any;
  slug: string;
  ACF?: {
    video_url: string;
    subtitle: string;
  };
}
