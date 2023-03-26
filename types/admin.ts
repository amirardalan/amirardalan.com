export interface AdminControlsTypes {
  admin: {
    controls: {
      cancel: string;
      confirm: string;
      delete: string;
      edit: string;
      save: string;
      publish: string;
      unpublish: string;
      drafts?: {
        id: number;
      }[];
    };
  };
}
