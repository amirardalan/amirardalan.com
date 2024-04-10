const appTitle = 'Amir Ardalan';
const appDesc = 'Design Engineer';
const metaDescription = `Design Engineer with 10+ years of experience crafting outstanding digital products.`;
const subheading = `The portfolio of a Design Engineer.`;

const emailAddress = 'hi@amirardalan.com';
const linkGitHub = 'https://github.com/amirardalan';
const linkX = 'https://x.com/amirardalan';
const linkLinkedIn = 'https://linkedin.com/in/amirardalan';
const linkCodePen = 'https://codepen.io/amirardalan/collections/public';

export const homeContent = {
  meta: {
    title: `${appTitle} – ${appDesc}`,
    description: metaDescription,
  },
  typed: [
    `I craft digital experiences`,
    `peruse my <a href="/blog">blog posts</a>`,
    `learn a bit <a href="/about">about me</a>`,
    `browse my <a href="/about#timeline">work history</a>`,
    `check out the <a href="/uses">tools I use</a>`,
    `delve into my <a href=${linkGitHub} rel="noopener noreferrer">GitHub</a>`,
    `follow me on <a href=${linkX} rel="noopener noreferrer">X</a>`,
  ],
  title: `${appTitle}`,
  subTitle: subheading,
  description: metaDescription,
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
      style: 'reverse',
    },
  ],
  featured: {
    title: 'Featured Post',
  },
  latest: {
    title: 'Latest Post',
  },
};

export const blogContent = {
  heading: 'Blog',
  meta: {
    title: `Blog – ${appTitle}`,
    description:
      'Thoughts on web development, design, and technology. Detailed guides for React, Next.js, TypeScript, and Markdown projects.',
  },
  error: {
    database: '⚠️ Database Error: Posts Could not be loaded.',
    auth: '⚠️ Authentication Error: Must be logged in to view this page',
  },
  search: {
    placeholder: 'Search title or #category',
    noresult: 'No posts found.',
    clear: 'Clear search',
    clearFilter: 'Clear filter',
  },
};

export const blogPostContent = {
  meta: {
    title: ` – ${appTitle}`,
  },
  title: {
    draft: 'Draft –',
  },
  xUrl: `${linkX}`,
};

export const aboutContent = {
  meta: {
    title: `About – ${appTitle}`,
    description: `${appTitle}'s bio, mission statement, skills, stack, experience, availability, and career timeline.`,
    github: 'GitHub',
    x: 'X',
    linkedin: 'LinkedIn',
  },
  heading: 'About',
  avatar: {
    title: `${appTitle}`,
    img: '/avatar/amir-ardalan.jpg',
  },
  social: {
    title: 'Follow Me',
    items: [
      {
        path: `${linkX}`,
        title: 'X',
        cName: 'iconX icon',
      },
      {
        path: `${linkLinkedIn}`,
        title: 'LinkedIn',
        cName: 'iconLinkedin icon',
      },
      {
        path: `${linkGitHub}`,
        title: 'GitHub',
        cName: 'iconGithub icon',
      },
      {
        path: `${linkCodePen}`,
        title: 'CodePen',
        cName: 'iconCodePen icon',
      },
    ],
  },
  bio: {
    subheading: `Hey, I'm Amir 👋`,
    content: metaDescription,
    items: [
      {
        path: '/resume',
        title: 'Download Resume',
        rel: 'noopener noreferrer',
        target: '_blank',
        icon: 'download',
      },
    ],
  },
  resume: {
    title: 'Resume',
  },
  skills: {
    title: 'Proficiencies',
    items: [
      'Frontend SWE',
      'TypeScript',
      'HTML + CSS',
      'REST APIs',
      'React',
      'Git',
      'Tailwind',
    ],
  },
  stack: {
    items: [
      'Next.js',
      'Figma',
      'Prisma ORM',
      'PostgreSQL',
      'SWR / ISR',
      'Responsive',
      'Three.js',
    ],
  },
  experience: {
    title: 'Experience',
    items: [
      "I've collaborated with industry-leading people at iconic brands including Nike, BASIC/DEPT®, Columbia Sportswear, and KEEN Footwear.",
      `I operate as a connector between design and engineering teams, with specializations in Front-end development and UI/UX design.`,
    ],
  },
  availability: {
    title: 'Current Project',
    text: 'Software Engineer II @',
    text2: 'Nike',
    location: 'Remote / onsite in Portland, OR Metro Area',
    link: 'https://lebronjamesinnovationcenter.nike.com/',
    items: [
      '• Develop user-focused prototypes and software.',
      '• Deliver industry-leading user experiences.',
      '• Act as a connector for UI/UX and dev teams.',
    ],
  },
  contact: {
    title: `Let's Chat`,
    email: {
      title: 'Show Email Address',
    },
    copiedToClipboard: 'Copied to clipboard ✅',
    items: [
      {
        path: 'https://x.com/messages/compose?recipient_id=23831468',
        title: 'X',
        rel: 'noopener noreferrer',
        target: '_blank',
        handle: '@amirardalan',
      },
    ],
  },
};

export const timelineContent = {
  meta: {
    title: 'Timeline',
  },
  fullStory: {
    text: 'Read the full story...',
    link: '/blog/2021-a-dev-odyssey',
  },
  items: [
    {
      title: 'Software Engineer II @ Nike',
      content:
        'Developing digital prototypes and tools for designers @ Nike LeBron James Innovation Center.',
      cName: 'event',
    },
    {
      content: 'Present',
      cName: 'date',
    },
    {
      content: '2022',
      cName: 'date',
    },
    {
      title: 'Freelancer & Consultant',
      content:
        'Building, maintaining open-source amirardalan.com Next.js blog & CMS. Writing about front-end code, devops, and tech.',
      cName: 'event',
    },
    {
      title: 'Freelance + React Learning',
      content:
        'Deep-dive into React, improving JavaScript skills, and honing user interface design capabilities.',
      cName: 'event',
    },
    {
      content: '2020',
      cName: 'date',
    },
    {
      content: '2018',
      cName: 'date',
    },
    {
      title: 'Application Engineer @ DemandPDX',
      content:
        'Fullstack Development in an agency environment for many clients including Hanna Andersson and Leatherman.',
      cName: 'event',
    },
    {
      title: 'Lead UI Engineer @ KEEN Footwear',
      content:
        'Developed new Salesforce Commerce Cloud Ecommerce websites for KEEN Footwear and Chrome Industries. Collaborated with BASIC/DEPT®.',
      cName: 'event',
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
      title: 'Web Dev I @ Columbia Sportswear',
      content:
        'Developed Frontend code for Columbia, SOREL, and Mountain Hardwear. Implemented localized content and content modules for international sales.',
      cName: 'event',
    },
    {
      title: 'Frontend Dev @ Dealer Spike',
      content:
        'HTML, CSS, and JavaScript and design. Created web experiences with a focus on SEO for powersports dealerships across US and Canada.',
      cName: 'event',
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
      title: 'Freelancer & Consultant',
      content:
        'Managed all aspects of business with 30+ clients. Developed websites using HTML, CSS, and JavaScript. Utilized CSS3, Boostrap, jQuery, and Wordpress.',
      cName: 'event',
    },
    {
      title: 'UI Designer @ Selliken Systems',
      content:
        'Worked on the HomeQuest real estate property search tool. Designed using Adobe Photoshop and Illustrator.',
      cName: 'event',
    },
    {
      content: '2006',
      cName: 'date',
    },
    {
      content: '2002',
      cName: 'date',
    },
    {
      title: 'Learning @ Southridge High School',
      content: `Began designing and animating Macromedia Flash websites and coding in ActionScript in my school's TV Studio.`,
      cName: 'event',
    },
    {
      title: 'Learning @ Southridge High School',
      content:
        'Wrote my first lines of HTML and CSS using Yahoo! Geocities. Fell in love with web development. Took HTML/CSS Web Design course sophomore year.',
      cName: 'event',
    },
    {
      content: '2000',
      cName: 'date',
    },
    {
      content: '1995',
      cName: 'date',
    },
    {
      title: 'First Computer',
      content:
        'Got a Compaq Presario CDS 524. Read Microsoft Encarta and played "Where In the World is Carmen San Diego" and "X-Wing".',
      cName: 'event',
    },
  ],
};

export const thanksContent = {
  meta: {
    title: `Thank You – ${appTitle}`,
    description: 'Your contribution is greatly appreciated!',
  },
  heading: 'Thank You.',
  copy: 'Your contribution to the project is greatly appreciated!',
};

export const usesContent = {
  meta: {
    title: `Uses – ${appTitle}`,
    description: 'A list of gear, tools, and software I use.',
  },
  heading: 'Uses',
  devices: {
    content: `### Devices
  #### Laptop
  - 13" MacBook Pro
  ##### Specs:
  - 3.3GHz i7
  - 16GB RAM
  ---
  #### Desktop
  - Custom PC
  ##### Specs:
  - Intel i7-14700KF 5.6GHz
  - Deepcool LT720
  - Asus ROG STRIX Z790-A GAMING WIFI II
  - Gigabyte RTX 4090 AERO OC 24GB
  - Corsair Vengeance DDR5-6400 CL32 64GB
  - Corsair RM1000x SHIFT 1000W
  - WD Black SN850X 4TB NVME
  - NZXT H7 Flow
  - ARCTIC P14 PST 72.8 CFM 140mm
  - Alienware AW3423DW 34.2" 175Hz
  ---
  #### Audio
  - Motu Audio Express
  - KRK VXT 8
  - Beyerdynamic DT770Pro
  - Sennheiser HD25-1 II
  - Apple AirPods Pro (2nd Gen USB-C)
  `,
  },
  tools: {
    content: `### Tools
  #### IDE
  - [VS Code](https://code.visualstudio.com/)
  ##### VS Code Extensions:
  - [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
  - [Tokyo Night](https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night)
  - [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - [CSS-in-JS](https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js)
  - [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)
  - [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

  ---
  #### Browser
  - [Google Chrome](https://www.google.com/chrome/)
  ##### Extensions (Chrome):
  - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
  - [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm)
  - [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
  - [Stylebot](https://chrome.google.com/webstore/detail/stylebot/oiaejidbmkiecgbjeifoejpgmdaleoha)

  `,
  },
  stack: {
    content: `### Stack

  #### Web
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Emotion](https://emotion.sh/docs/introduction)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Supabase](https://supabase.com)
  - [Prisma](https://www.prisma.io/)
  - [SWR](https://swr.vercel.app/)
  - [React Markdown](https://remarkjs.github.io/react-markdown/)
  - [React Syntax Highlighter](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [Vercel](https://vercel.com)

  ---
  #### CLI
  - Terminal (~ZSH)
  - Powershell 7
  - [Powerlevel10k](https://github.com/romkatv/powerlevel10k)
  - [GitHub CLI](https://cli.github.com/)
  - [Vercel CLI](https://vercel.com/cli)
  - [Supabase CLI](https://supabase.com/docs/reference/cli)

  ---
  #### AI
  - [ChatGPT](https://chat.openai.com/chat)
  - [GitHub Copilot](https://copilot.github.com/)

  `,
  },
  software: {
    content: `### Software
  
  #### Markdown
  - [iA Writer](https://ia.net/writer)

  #### Design
  - [Figma](https://www.figma.com/)
  - [Aseprite](https://www.aseprite.org/)
  
  #### Music & Podcasts
  - [YouTube Music](https://music.youtube.com)
  - [Apple Podcasts](https://www.apple.com/apple-podcasts/)

  ---

  #### Testing
  ##### React/JS:
  - [Jest](https://jestjs.io/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  ##### iOS/Safari:
  - [Xcode Simulator](https://developer.apple.com/xcode/)
  
  `,
  },
};

export const errorContent = {
  notFound: {
    meta: {
      title: `Page Not Found – ${appTitle}`,
    },
    title: '404',
    text: `🤔 Page not found`,
    link: {
      path: '/',
      title: 'Return Home',
    },
    quote: `"The best thing about a boolean is even if you are wrong, you are only off by a bit."`,
    author: 'Unknown',
  },
  internalServerError: {
    meta: {
      title: `Internal Server Error – ${appTitle}`,
    },
    title: '500',
    text: `😵 Internal server error`,
    link: {
      path: '/',
      title: 'Return Home',
    },
    quote: `"Whoops, something has gone awry. I'll have this patched up in no time..."`,
    author: 'Amir',
  },
};

export const footer = {
  logo: {
    alt: `${appTitle} Logo`,
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
    },
    {
      path: 'https://vercel.com/',
      title: 'Vercel',
    },
    {
      path: 'https://www.prisma.io/',
      title: 'Prisma',
    },
    {
      path: 'https://supabase.com/',
      title: 'Supabase',
    },
    {
      path: 'https://threejs.org/',
      title: 'Three.js',
    },
  ],
  social: [
    {
      path: `${linkX}`,
      title: '𝕏',
    },
    {
      path: `${linkGitHub}`,
      title: 'GitHub',
    },
    {
      path: `${linkLinkedIn}`,
      title: 'LinkedIn',
    },
    {
      path: `mailto:${emailAddress}`,
      title: 'Email',
    },
    {
      path: '/resume',
      title: 'Resume',
    },
  ],
  copyright: {
    text: '© ',
    name: `${appTitle}`,
  },
};

export const breadcrumbContent = {
  blog: 'Blog',
  create: 'Create',
  drafts: 'Drafts',
  edit: 'Edit',
};

// Admin
export const adminContent = {
  meta: {
    title: ` – ${appTitle}`,
  },
  controls: {
    publish: 'Publish',
    unpublish: 'Unpublish',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel',
    update: 'Update',
    save: 'Save',
    checkbox: {
      featured: 'Display on homepage. Can only feature one post at a time.',
      updateDate: 'If unchecked, original post date will display on post.',
    },
  },
  input: {
    placeholder: {
      title: 'Title',
      slug: 'URL/Slug',
      teaser: 'Teaser',
      content: 'Content',
    },
  },
  edit: {
    meta: {
      title: 'Edit',
    },
  },
  create: {
    meta: {
      title: `Create – ${appTitle}`,
    },
  },
  drafts: {
    meta: {
      title: `Drafts – ${appTitle}`,
    },
    notice: `Unpublished Draft`,
    empty: `No drafts. Nice and tidy! Perhaps`,
    empty2: 'try writing',
    empty3: 'one?',
  },
};
