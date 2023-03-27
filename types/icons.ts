export interface SocialIconsTypes {
  social?: object & {
    items?: Array<{
      path: string;
      title: string;
      target: string;
      rel: string;
      content: string;
      icon: {
        dark: string;
        light: string;
      };
    }>;
  };
}
