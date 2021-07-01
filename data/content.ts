import { themeLight, themeDark } from "@/styles/theme"

export const logo = {
  title: 'Amir Ardalan',
  subtitle: 'Portland,Oregon',
  alt: 'Amir Ardalan Logo',
}

export const avatar = {
  title: 'Amir Ardalan',
  img: 'https://github.com/amirardalan.png',
}

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
      `'Fullstack Code'^1500`,
      `'React'^1500`,
      `'Next.js'^1500`,
      `'JavaScript'^1500`,
      `'TypeScript'^1500`,
      `'UI Design'^1500`,
      `'Writing'^1500`,
      `'Emotion CSS'^1500`,
      `'Three.js'^1500`,
      `'react-three-fiber'^1500`,
      `'Prisma ORM'^1500`,
      `'PostgreSQL'^1500`,
      `'Markdown'^1500`,
      `'Accessibility'^1500`,
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
  heading: 'About',
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
        path: '#timeline',
        title: 'Timeline',
        rel: '',
        target: '_self',
        icon: {
          light: themeLight.icons.time,
          dark: themeDark.icons.time,
        },
      },
    ],
  },
  skills: {
    title: 'Skills:',
    items: [
      'Fullstack Dev',
      'React',
      'JavaScript',
      'TypeScript',
      'CSS-in-JS',
      'SCSS',
      'UI Design',
      'Relational DBs',
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
      'Vercel',
      'Heroku',
      'Markdown',
      'Google Analytics',
    ]
  },
  experience: {
    title: 'Experience:',
    items: [
      '10+ years',
      'Columbia Sportswear Company',
      'KEEN Footwear',
      'Chrome Industries',
      'Hanna Andersson',
      'Salesforce Commerce Cloud',
      'Agile/Scrum Methodology',
      'Freelance',
      'Ecommerce',
      'Agency',
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

export const timeline = {
  title: 'Timeline',
  items: [
    {
      content: 'Present',
      cName: 'date',
    },
    {
      title: 'Fullstack Developer, Writer',
      content: '✍️ Currently expanding React skills with Next.js and TypeScript and writing on this website.',
      cName: 'event'
    },
    {
      title: 'Learning',
      content: '👨‍💻 Deep-dive into React, improving JavaScript skills, and honing user interface design capabilities.',
      cName: 'event'
    },
    {
      content: '2019',
      cName: 'date',
    },
    {
      content: '2018',
      cName: 'date',
    },
    {
      title: 'Application Engineer @ DemandPDX',
      content: '💼 Fullstack Development in an agency environment for many clients including Hanna Andersson and Leatherman.',
      cName: 'event'
    },
    {
      title: 'UI Engineering Lead @ KEEN Footwear',
      content: '💼 Developed new Salesforce Commerce Cloud Ecommerce websites for KEEN Footwear and Chrome Industries. Collaborated with BASIC® Agency.',
      cName: 'event'
    },
    {
      content: '2015',
      cName: 'date',
    },
    {
      content: '2014',
      cName: 'date',
    },
    {
      title: 'Web Developer I @ Columbia Sportswear',
      content: '💼 Developed Frontend code for Columbia, SOREL, and Mountain Hardwear. Implemented localized content and content modules for international sales.',
      cName: 'event'
    },
    {
      title: 'Frontend Dev and UI Designer @ Dealer Spike',
      content: '💼 HTML, CSS, and JavaScript and design in Adobe Photoshop. Created web experiences with a focus on SEO for powersports dealerships across US and Canada.',
      cName: 'event'
    },
    {
      content: '2011',
      cName: 'date',
    },
    {
      content: '2007',
      cName: 'date',
    },
    {
      title: 'Freelancer @ Self Employed',
      content: '💼 Managed all aspects of business with 30+ clients. Developed websites using HTML, CSS, and JavaScript. Utilized CSS3, Boostrap, jQuery, and Wordpress.',
      cName: 'event'
    },
    {
      title: 'UI Designer @ Selliken Systems',
      content: '💼 Worked on the HomeQuest real estate property search tool. Designed using Adobe Photoshop and Illustrator.',
      cName: 'event'
    },
    {
      content: '2005',
      cName: 'date',
    },
    {
      content: '2002',
      cName: 'date',
    },
    {
      title: 'Learning @ Southridge High School',
      content: `✨ Began designing and animating Macromedia Flash websites and coding in ActionScript in my school's TV Studio.`,
      cName: 'event'
    },
    {
      title: 'Learning @ Southridge High School',
      content: '❤️ Wrote my first lines of HTML and CSS using Yahoo! Geocities. Fell in love with web development. Took HTML/CSS Web Design course sophomore year.',
      cName: 'event'
    },
    {
      content: '2000',
      cName: 'date',
    },
  ]
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

export const uses = {
  meta: {
    title: 'Uses – Amir Ardalan',
  },
  heading: 'Uses',
  devices: {
    content:
  `### Devices
  #### Laptop
  - 2016 13" MacBook Pro (silver)
  ##### Specs:
  - 3.3GHz Dual-Core Intel i7
  - 16GB RAM
  - 500GB Flash Storage
  - MacOS Big Sur
  #### Desktop
  - Self-built PC
  ##### Specs:
  - 3.8GHz 6-Core Intel i7 3930K
  - 32GB RAM
  - 2x 1TB SSD
  - Geforce GTX 1080 Founders Edition
  - Motu Audio Express
  - 2x KRK VXT 8
  - Microsoft Windows 10
  #### Phone
  - iPhone 11 Pro (black)
  ##### Specs:
  - 512GB Storage
  ##### Case:
  - [TORRAS Silicon Series (black)](https://torraslife.com/product/iphone-11-pro-silicone-series-case/)
  #### Headphones
  - [Beyerdynamic DT770Pro 80ohm](https://north-america.beyerdynamic.com/dt-770-pro.html)
  - [Sennheiser HD25-1 II](https://en-us.sennheiser.com/on-ear-dj-headphone-hd25) `
  },
  software: {
    content:
  `### Software
  #### IDE
  - [VS Code](https://code.visualstudio.com/)
  ##### Extensions:
  - [Community Material Theme (Palenight)](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-community-material-theme)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [GitHub Pullrequests and Issue Provider](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
  - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
  - [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
  - [Next.js snippets](https://marketplace.visualstudio.com/items?itemName=PulkitGangwar.nextjs-snippets)
  - [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
  - [VSCode Vercel](https://marketplace.visualstudio.com/items?itemName=frenco.vscode-vercel)
  - [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

  #### Browser
  - [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)
  ##### Add-ons:
  - [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
  - [Lighthouse](https://addons.mozilla.org/en-US/firefox/addon/google-lighthouse/)
  - [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/)
  - [GA Debug](https://addons.mozilla.org/en-US/firefox/addon/ga-debugger/)

  #### CLI
  - Terminal (~ZSH)
  ##### Tools:
  - Git
  - Yarn
  - Vercel CLI
  - Heroku CLI
  
  #### Markdown
  - [iA Writer](https://ia.net/writer)

  #### Design
  - [Adobe XD](https://www.adobe.com/products/xd.html)

  #### Testing
  ##### iOS:
  - [Xcode Simulator](https://developer.apple.com/xcode/)
  ##### Android:
  - [Browser Stack](https://www.browserstack.com/)
  
  #### Communication
  - [Slack](https://slack.com/)
  - [Zoom](https://zoom.us/)
  - [Discord](https://discord.com/)
  
  #### Music & Podcasts
  - [Spotify](https://www.spotify.com/)`
  },
  stack: {
    content:
  `### Stack
  #### Framework
  - [Next.js](https://nextjs.org/)
  #### Language
  - [TypeScript](https://www.typescriptlang.org/)
  #### CSS
  - [Emotion](https://emotion.sh/docs/introduction)
  #### Database
  - [PostgreSQL](https://www.postgresql.org/)
  #### ORM
  - [Prisma](https://www.prisma.io/)
  #### Data Fetching
  - [SWR](https://swr.vercel.app/)
  #### Markdown
  - [React Markdown](https://github.com/remarkjs/react-markdown)
  - [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
  #### Hosting
  - [Vercel](https://vercel.com)`
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
  logo: {
    alt: 'Amir Ardalan Logo'
  },
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