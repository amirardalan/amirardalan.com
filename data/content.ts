export const home = {
  meta: {
    title: 'Amir Ardalan – Developer, Designer, Writer',
    description: 'Front-end developer, UI designer & React enthusiast based in Portland, OR'
  },
  title: 'Amir Ardalan',
  typed: {
    heading: `I'm currently focusing on:`,
    items: [
      `Next.js / React^1500`,
      `TypeScript / JavaScript^1500`,
      `Emotion CSS in JS^1500`,
      `Three.js / R3F^1500`,
      `Prisma ORM^1500`,
      `PostgreSQL^1500`,
      `Fullstack Engineering^1500`,
      `UI Design^1500`,
      `Web Accessibility^1500`,
      `Writing^1500`,
      `Technical Learning^1500`,
      `...eating pizza 🍕^1500`,
    ]
  },
  cta: {
    blog: {
      path: '/blog',
      title: 'Blog',
    },
    about: {
      path: '/about',
      title: 'About',
    },
  },
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
    title: 'Social',
    items: [
      {
        path: 'https://github.com/amirardalan',
        title: 'GitHub',
        cName: 'iconGithub'
      },
      {
        path: 'https://twitter.com/amirardalan',
        title: 'Twitter',
        cName: 'iconTwitter'
      },
      {
        path: 'https://linkedin.com/in/amirardalan',
        title: 'LinkedIn',
        cName: 'iconLinkedin'
      },
    ]
  },
  bio: {
    heading: 'Bio:',
    subheading: 'Developer, Designer, Writer.',
    content: `I write code, design user interfaces, and blog about web development. I'm passionate about the art and science of interfacing humans with technology.`,
    items: [  
      {
        path: '/amir-ardalan-resume.pdf',
        title: 'Resume',
        icon: 'download',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
      {
        path: '/blog/2021-a-dev-odyssey',
        title: 'Journey',
        icon: 'none',
        rel: '',
        target: '_self'
      },
    ],
  },
  skills: {
    title: 'Skills:',
    items: [
      'Fullstack Engineering',
      'User Interface Design',
      'JavaScript / TypeScript',
      'React.js / Next.js',
      'CSS in JS / SCSS',
      'Prisma ORM + PostgreSQL',
      'Testing & documentation',
    ],
  },
  experience: {
    title: 'Experience:',
    items: [
      '10+ years',
      'Columbia Sportswear',
      'KEEN Footwear',
      'Chrome Industries',
      'Hanna Andersson',
      'Salesforce Commerce Cloud',
      'Freelance',
    ],
  },
  availability: {
    title: 'Availability:',
    items: [
      '✅ Currently Available',
      'Remote or Portland, OR',
    ]
  },
  contact: {
    title: 'Contact:',
    email: 'hi@amirardalan.com',
    items: [
      {
        path: 'https://twitter.com/messages/compose?recipient_id=23831468',
        title: 'Twitter DM',
        rel: 'noopener noreferrer',
        target: '_blank',
        icon: 'none',
        handle: '@amirardalan',
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
    online: 'Now playing:',
    offline: 'Currently Offline'
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
    },
    {
      path: 'https://www.prisma.io/',
      title: 'Prisma',
    },
    {
      path: 'https://swr.vercel.app/',
      title: 'SWR',
    },
  ],
  social: [
    {
      path: 'https://github.com/amirardalan',
      title: 'GitHub',
    },
    {
      path: 'https://twitter.com/amirardalan',
      title: 'Twitter',
    },
    {
      path: 'https://linkedin.com/in/amirardalan',
      title: 'LinkedIn',
    },
  ],
  contact: [
    {
      path: 'mailto:hi@amirardalan.com',
      title: 'hi@amirardalan.com',
      cName: 'small'
    },
    {
      path: 'https://twitter.com/messages/compose?recipient_id=23831468',
      title: 'Twitter DM',
      cName: 'small'
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