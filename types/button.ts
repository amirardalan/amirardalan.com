export type CtaButtonsTypes = {
  items: Array<{
    path: string;
    title: string;
    icon: string;
    target: string;
    rel: string;
    style?: string;
  }>;
};

export type ContactButtonTypes = {
  content: {
    contact: {
      email: {
        title: string;
      };
      copiedToClipboard: string;
    };
  };
};
