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
    title: 'Amir Ardalan – Code, design, and ideas from Portland, OR.',
    description: 'Front-end developer, UI designer, and React enthusiast.'
  },
  intro: '👋 Hi my name is',
  title: 'Amir Ardalan',
  description: `I'm a Front-end Engineer specializing in React, UI Design, and accessibility for the web. I'm passionate about Next.js, Three.js, and Web 3.0 technologies.`,
  typed: {
    heading: `interests => {`,
    line2: `// TODO: continue learning`,
    items: [
      `'Fullstack Development'^1500`,
      `'React'^1500`,
      `'Next.js'^1500`,
      `'JavaScript'^1500`,
      `'TypeScript'^1500`,
      `'User Interface Design'^1500`,
      `'Writing'^1500`,
      `'Emotion CSS'^1500`,
      `'Three.js'^1500`,
      `'react-three-fiber'^1500`,
      `'Prisma ORM'^1500`,
      `'PostgreSQL'^1500`,
      `'Markdown'^1500`,
      `'Jest Testing'^1500`,
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
  heading: 'Blog',
  meta: {
    title: 'Blog – Amir Ardalan',
    description: 'Thoughts on web development, design, and web 3.0 with code examples and guides.'
  },
  error: {
    database: '⚠️ Database Error: Posts Could not be loaded.',
    auth: '⚠️ Authentication Error: Must be logged in to view this page',
  },
  search: {
    placeholder: 'Search posts',
    noresult: 'No posts found.',
    clear: 'Clear search'
  },
}

export const blogPost = {
  meta: {
    title: ' – Amir Ardalan'
  },
  title: {
    draft: 'Draft –'
  },
  twitterUrl: 'https://twitter.com/amirardalan',
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
      }
    ],
  },
  skills: {
    title: 'Skills:',
    items: [
      'Fullstack Dev',
      'React',
      'JavaScript',
      'CSS / SCSS',
      'Three.js',
      'User Interface',
      'Databases',
      'Unit Testing',
      'Documentation',
      'G. Analytics',
    ]
  },
  stack: {
    title: 'Stack:',
    items: [
      'Next.JS',
      'TypeScript',
      'Emotion',
      'Prisma ORM',
      'PostgreSQL',
      'SWR',
      'Jest / RTL',
      'Vercel',
      'Heroku',
      'Adobe XD',
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
    copiedToClipboard: 'Copied to clipboard ✅',
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
  meta: {
    title: 'Timeline',
  },
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
    {
      content: '1995',
      cName: 'date'
    },
    {
      title: 'First Computer',
      content: '🖥️ Got a Compaq Presario CDS 524. Read Microsoft Encarta and played "Where In the World is Carmen San Diego" and "X-Wing".',
      cName: 'event'
    },
  ]
}

export const spotify = {
  meta: {
    title: 'Spotify – Amir Ardalan',
    description: `See what I'm currently listening to on Spotify and view my top 20 tracks of the moment.`
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
    description: 'A list of gear, tools, and software I use.'
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
  - MacOS Monterey
  ------
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
  ------
  #### Phone
  - iPhone 11 Pro (Space Gray)
  ##### Specs:
  - 512GB Storage
  ##### Case:
  - [TORRAS Silicon Series (black)](https://torraslife.com/product/iphone-11-pro-silicone-series-case/)
  ------
  #### Headphones
  - [Beyerdynamic DT770Pro 80ohm](https://north-america.beyerdynamic.com/dt-770-pro.html)
  - [Sennheiser HD25-1 II](https://en-us.sennheiser.com/on-ear-dj-headphone-hd25)
  - [Apple AirPod Pro](https://www.apple.com/airpods-pro/)
  `
  },
  tools: {
    content:
  `### Tools
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
  ------
  #### Browser
  - [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)
  ##### Add-ons:
  - [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
  - [Lighthouse](https://addons.mozilla.org/en-US/firefox/addon/google-lighthouse/)
  - [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/)
  - [GA Debug](https://addons.mozilla.org/en-US/firefox/addon/ga-debugger/)
  ------
  #### CLI
  - Terminal (~ZSH)
  ------
  #### Testing
  ##### iOS:
  - [Xcode Simulator](https://developer.apple.com/xcode/)
  ##### Android:
  - [Browser Stack](https://www.browserstack.com/)`
  },
  stack: {
    content:
  `### Stack
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Emotion](https://emotion.sh/docs/introduction)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Heroku](https://heroku.com)
  - [Prisma](https://www.prisma.io/)
  - [SWR](https://swr.vercel.app/)
  - [React Markdown](https://remarkjs.github.io/react-markdown/)
  - [React Syntax Highlighter](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/)
  - [Jest](https://jestjs.io/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [Vercel](https://vercel.com)`
  },
  software: {
    content:
  `### Software
  
  #### Markdown
  - [iA Writer](https://ia.net/writer)

  #### Design
  - [Adobe XD](https://www.adobe.com/products/xd.html)
  
  #### Communication
  - [Slack](https://slack.com/)
  - [Zoom](https://zoom.us/)
  - [Discord](https://discord.com/)
  
  #### Music & Podcasts
  - [Spotify](/spotify)`
  },
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
  blogPostError: {
    title: 'Oops...',
    text: 'That post is no longer available.',
    link: {
      path: 'Blog',
      title: 'Return to Blog',
    },
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
      path: 'https://remarkjs.github.io/react-markdown/',
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
    text: '©',
    name: 'Amir Ardalan',
  },
}

export const breadcrumb = {
  blog: 'Blog',
  create: 'Create',
  drafts: 'Drafts',
  edit: 'Edit',
}

// Donate
export const donate = {
  qr: 'data:image/png;base64,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',
  text: 'Donate ETH',
  address: '0xA6907788691Ae047441aa52075b1617EE0b71352',
  copied: 'Address copied to clipboard ✅',
  meta: 'Copy address'
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
      title: 'Drafts – Amir Ardalan'
    }
  }
}