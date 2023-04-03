export interface BlogNavigationTypes {
  feed: {
    length: number;
    sort: Function;
    id: number;
    [key: number]: any;
  };
  post: {
    title: string;
    id: number;
  };
  url: string;
  isPublished: Boolean;
}

export interface BlogStatsTypes {
  id?: number;
  publishedAt?: string | Date;
  editedAt?: string | Date;
  slug?: string;
  title?: string;
  teaser?: string;
  content?: string;
  featured?: boolean;
  published?: boolean;
  showEdited?: boolean;
  authorId?: number;
  likes?: number;
  category?: string;
}
