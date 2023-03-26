export interface BlogNavigationTypes {
  feed: {
    length: number;
    sort: Function;
    id: number;
    [key: number]: any;
  };
  post: {
    id: number;
  };
  isPublished: Boolean;
}
