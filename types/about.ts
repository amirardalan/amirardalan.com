export interface AboutTypes {
  meta: {
    title: string;
    description: string;
    github: string;
    x: string;
    linkedin: string;
  };
  heading: string;
  avatar: {
    title: string;
    img: string;
  };
  social: {
    title: string;
    items: {
      path: string;
      title: string;
      cName: string;
      icon: {
        light: string;
        dark: string;
      };
    }[];
  };
  bio: {
    subheading: string;
    content: string;
    items: {
      path: string;
      title: string;
      rel: string;
      target: string;
      icon: string;
    }[];
  };
  resume: {
    title: string;
  };
  skills: {
    title: string;
    items: string[];
  };
  stack: {
    items: string[];
  };
  experience: {
    title: string;
    items: string[];
  };
  availability: {
    title: string;
    text: string;
    text2: string;
    title2: string;
    location: string;
    link: string;
    items: string[];
  };
  contact: {
    title: string;
    email: {
      title: string;
    };
    copiedToClipboard: string;
    items: {
      path: string;
      title: string;
      rel: string;
      target: string;
      handle: string;
      icon: {
        light: string;
        dark: string;
      };
    }[];
  };
}

export interface TimelineTypes {
  timeline: {
    meta: {
      title: string;
    };
    items: { title?: string | undefined; content: string; cName: string }[];
    fullStory: {
      link: string;
      text: string;
    };
  };
}

export interface TimelineContentTypes {
  meta: {
    title: string;
  };
  fullStory: {
    text: string;
    link: string;
  };
  items: Array<{
    title?: string;
    content: string;
    cName: string;
  }>;
}
