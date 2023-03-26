export type CtaButtonsProps = {
  items: Array<{
    path: string;
    title: string;
    icon: string;
    target: string;
    rel: string;
  }>;
};

export type ContactButtonProps = {
  props: {
    contact: {
      email: {
        title: string;
      };
      copiedToClipboard: string;
    };
  };
};
