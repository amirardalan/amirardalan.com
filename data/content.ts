import { themeLight, themeDark } from "@/styles/theme"

export const home = {
  meta: {
    title: 'Amir Ardalan – Developer, Designer, Writer',
    description: 'Fullstack developer, UI designer & React enthusiast based in Portland, OR'
  },
  title: 'Amir Ardalan',
  typed: {
    heading: `interests => {`,
    line2: `// TODO: continue learning`,
    items: [
      `'Fullstack Development'^1500`,
      `'Next.js / React'^1500`,
      `'TypeScript / JavaScript'^1500`,
      `'UI Design'^1500`,
      `'Writing'^1500`,
      `'Emotion CSS-in-JS'^1500`,
      `'Three.js / R3F'^1500`,
      `'Prisma ORM'^1500`,
      `'PostgreSQL'^1500`,
      `'Markdown'^1500`,
      `'Web Accessibility'^1500`,
    ],
    end: '}'
  },
  items: [
    {
      path: '/blog',
      title: 'Blog',
      target: '_self',
    },
    {
      path: '/about',
      title: 'About',
      target: '_self',
    },
  ],
  latestPost: {
    title: 'Latest Post:'
  }
}

export const blog = {
  meta: {
    title: 'Blog – Amir Ardalan',
  },
  error: {
    database: '⚠️ Database Error: Posts Could not be loaded.',
    auth: '⚠️ Authentication Error: Must be logged in to view this page',
  },
  search: {
    placeholder: 'Search posts',
    noresult: 'No posts found.'
  }
}

export const blogPost = {
  meta: {
    title: ' – Amir Ardalan'
  },
  title: {
    draft: '(Draft)'
  },
}

export const about = {
  meta: {
    title: 'About – Amir Ardalan',
    github: 'GitHub',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
  },
  heading: 'About Me',
  social: {
    title: 'Social:',
    items: [
      {
        path: 'https://github.com/amirardalan',
        title: 'GitHub',
        cName: 'iconGithub icon',
        icon: {
          light: themeLight.icons.github,
          dark: themeDark.icons.github
        },
      },
      {
        path: 'https://twitter.com/amirardalan',
        title: 'Twitter',
        cName: 'iconTwitter icon',
        icon: {
          light: themeLight.icons.twitter,
          dark: themeDark.icons.twitter
        },
      },
      {
        path: 'https://linkedin.com/in/amirardalan',
        title: 'LinkedIn',
        cName: 'iconLinkedin icon',
        icon: {
          light: themeLight.icons.linkedin,
          dark: themeDark.icons.linkedin
        },
      },
    ]
  },
  bio: {
    heading: 'Bio:',
    subheading: 'Developer, Designer, Writer.',
    content: `Interfacing humans with technology through Fullstack development and UI design, with deep knowledge in Front-end and Ecommerce.`,
    items: [  
      {
        path: '/amir-ardalan-resume.pdf',
        title: 'Resume',
        rel: 'noopener noreferrer',
        target: '_blank',
        icon: {
          light: themeLight.icons.download,
          dark: themeDark.icons.download,
        },
      },
      {
        path: '/blog/2021-a-dev-odyssey',
        title: 'Journey',
        rel: '',
        target: '_self',
      },
    ],
  },
  skills: {
    title: 'Skills:',
    items: [
      'Fullstack Dev',
      'React',
      'TypeScript',
      'CSS-in-JS',
      'SCSS',
      'UI Design',
      'RESTful API',
      'Relational DB',
      'Unit Testing',
      'Documentation',
    ]
  },
  stack: {
    items: [
      'Next.JS',
      'Emotion',
      'Prisma ORM',
      'PostgreSQL',
      'SWR',
      'Adobe XD',
      'Markdown',
    ]
  },
  experience: {
    title: 'Experience:',
    items: [
      '10+ years',
      'Freelance',
      'Ecommerce',
      'Salesforce Commerce Cloud',
      'Columbia Sportswear',
      'KEEN Footwear',
      'Chrome Industries',
      'Hanna Andersson',
    ],
  },
  availability: {
    title: 'Availability:',
    items: [
      '✅ Currently Available',
      'Remote or in Portland, OR',
    ]
  },
  contact: {
    title: 'Contact:',
    email: {
      title: 'Show Email Address',
      icon: {
        light: themeLight.icons.email,
        dark: themeDark.icons.email,
      }
    },
    copiedToClipboard: 'Copied to clipboard ✓',
    items: [
      {
        path: 'https://twitter.com/messages/compose?recipient_id=23831468',
        title: 'Twitter',
        rel: 'noopener noreferrer',
        target: '_blank',
        handle: '@amirardalan',
        icon: {
          light: themeLight.icons.external,
          dark: themeDark.icons.external
        },
      },
    ],
  },
}

export const spotify = {
  meta: {
    title: 'Spotify Dashboard | Amir Ardalan'
  },
  headings: {
    main: 'Spotify Dashboard',
    toptracks: 'Top Tracks',
  },
  status: {
    online: 'Now playing',
    offline: 'Currently Offline'
  },
  icon: {
    light: themeDark.icons.spotify,
    dark: themeLight.icons.spotify
  }
}

export const error = {
  meta: {
    title: 'Page Not Found – Amir Ardalan'
  },
  title: '404',
  img: {
    meta: 'Error'
  },
  text: 'You seem to be lost in space...',
  link: {
    path: '/',
    title: 'Return Home'
  },
}

export const footer = {
  headings: {
    nav: 'Explore',
    social: 'Connect',
    poweredby: 'Powered By',
    contact: 'Contact',
  },
  poweredby: [
    {
      path: 'https://nextjs.org/',
      title: 'Next.js',
      icon: {
        light: themeLight.icons.external,
        dark: themeDark.icons.external
      },
    },
    {
      path: 'https://emotion.sh/docs/introduction/',
      title: 'Emotion',
      icon: {
        light: themeLight.icons.external,
        dark: themeDark.icons.external
      },
    },
    {
      path: 'https://github.com/remarkjs/react-markdown',
      title: 'React-Markdown',
      icon: {
        light: themeLight.icons.external,
        dark: themeDark.icons.external
      },
    },
    {
      path: 'https://www.prisma.io/',
      title: 'Prisma',
      icon: {
        light: themeLight.icons.external,
        dark: themeDark.icons.external
      },
    },
    {
      path: 'https://swr.vercel.app/',
      title: 'SWR',
      icon: {
        light: themeLight.icons.external,
        dark: themeDark.icons.external
      },
    },
  ],
  social: [
    {
      path: 'https://github.com/amirardalan',
      title: 'GitHub',
      icon: {
        light: themeLight.icons.external,
        dark: themeDark.icons.external
      },
    },
    {
      path: 'https://twitter.com/amirardalan',
      title: 'Twitter',
      icon: {
        light: themeLight.icons.external,
        dark: themeDark.icons.external
      },
    },
    {
      path: 'https://linkedin.com/in/amirardalan',
      title: 'LinkedIn',
      icon: {
        light: themeLight.icons.external,
        dark: themeDark.icons.external
      },
    },
    {
      path: '/amir-ardalan-resume.pdf',
      title: 'Resume',
      icon: {
        light: themeLight.icons.download,
        dark: themeDark.icons.download
      },
    },
  ],
  copyright: {
    text: 'Copyright ©',
    name: 'Amir Ardalan',
  },
}

export const breadcrumb = {
  blog: 'Blog',
  create: 'Create',
  drafts: 'Drafts',
  edit: 'Edit',
}

// Admin
export const admin = {
  controls: {
    publish: 'Publish',
    unpublish: 'Unpublish',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel',
    update: 'Update',
    save: 'Save',
  },
  input: {
    placeholder: {
      title: 'Title',
      slug: 'URL/Slug',
      teaser: 'Teaser',
      content: 'Content'
    }
  },
  edit: {
    meta: {
      title: 'Edit'
    }
  },
  create: {
    meta: {
      title: 'Create – Amir Ardalan'
    }
  },
  drafts: {
    meta: {
      title: 'Drafts - Amir Ardalan'
    }
  }
}