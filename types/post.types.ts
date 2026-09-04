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

export interface EmbeddedTerm {
  name: string;
  slug: string;
}

export interface EmbeddedFeaturedMedia {
  media_details: {
    sizes: {
      "featured-thumbnail": { source_url: string };
      "medium-thumbnail": { source_url: string };
    };
  };
  source_url: string;
}

export interface EmbeddedAuthor {
  avatar_urls: Record<string, string>;
  slug: string;
  name: string;
}

export interface EmbeddedData {
  "wp:term"?: EmbeddedTerm[][];
  "wp:featuredmedia"?: EmbeddedFeaturedMedia[];
  author?: EmbeddedAuthor[];
}

export interface PostResponseType {
  id: number;
  title: {
    rendered: string
  };
  date: string;
  _embedded: EmbeddedData;
  slug: string;
  ACF?: {
    video_url: string;
    subtitle: string;
  };

  // Favorites
  _links?: {
    "wp:featuredmedia": [{
      href: string
    }];
  };
  categories?: number[]
}
