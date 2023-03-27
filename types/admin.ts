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
    };
    drafts: {
      notice: string;
    };
  };
}

export interface DraftTypes extends AdminControlsTypes {
  admin: {
    meta: {
      title: string;
      description: string;
    };
    create: {
      meta: {
        title: string;
      };
      title: string;
      slug: string;
      teaser: string;
      content: string;
      category: string;
      featured: string;
      submit: string;
      cancel: string;
    };
    controls: {
      cancel: string;
      confirm: string;
      delete: string;
      edit: string;
      save: string;
      publish: string;
      unpublish: string;
      checkbox: {
        publish: string;
        featured: string;
      };
    };
    drafts: {
      notice: string;
    };
    input: {
      title: string;
      slug: string;
      teaser: string;
      content: string;
      category: string;
      featured: string;
      submit: string;
      cancel: string;
      placeholder: {
        title: string;
        slug: string;
        teaser: string;
        content: string;
        category: string;
        featured: string;
      };
    };
  };
  breadcrumb: {
    home: string;
    blog: string;
    create: string;
  };
}
