export const appTitle = 'Amir Ardalan';
const appDesc = 'Design Engineer';
const metaDescription = `Design Engineer with 10+ years of experience based in Portland, OR.`;

const emailAddress = 'hi@amirardalan.com';
const linkGitHub = 'https://github.com/amirardalan';
const linkX = 'https://x.com/amirardalan';
const linkLinkedIn = 'https://linkedin.com/in/amirardalan';
const linkCodePen = 'https://codepen.io/amirardalan/collections/public';

export const homeContent = {
  meta: {
    title: `${appTitle} — ${appDesc}`,
    description: metaDescription,
  },
  typed: [
    `cd amir.sh --hello`,
    `learn a bit <a href="/about">about</a> me^3000`,
    `peruse my <a href="/blog">blog</a> posts^3000`,
    `traverse my <a href="/about#timeline">timeline</a>^3000`,
    `browse my <a href="/photos">photos</a>^3000`,
    `view my <a href="/uses">toolbox</a>^3000`,
    `follow me <a href=${linkX} rel="noopener noreferrer">on x.com</a>^3000`,
    `explore my <a href=${linkGitHub} rel="noopener noreferrer">github</a>^3000`,
  ],
  title: `${appTitle}`,
  subTitle: appDesc,
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
  heading: `Blog — ${appTitle}`,
  meta: {
    title: `Blog — ${appTitle}`,
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
    title: ` — ${appTitle}`,
  },
  title: {
    draft: 'Draft —',
  },
  xUrl: `${linkX}`,
};

export const aboutContent = {
  meta: {
    title: `About — ${appTitle}`,
    description: `${appTitle}'s summary and career timeline.`,
    github: 'GitHub',
    x: 'X',
    linkedin: 'LinkedIn',
  },
  heading: `About — ${appTitle}`,
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
        path: `${linkGitHub}`,
        title: 'GitHub',
        cName: 'iconGithub icon',
      },
      {
        path: `${linkLinkedIn}`,
        title: 'LinkedIn',
        cName: 'iconLinkedin icon',
      },
      {
        path: `${linkCodePen}`,
        title: 'CodePen',
        cName: 'iconCodePen icon',
      },
    ],
  },
  bio: {
    items: [
      {
        path: '/resume',
        title: 'Resume',
        rel: 'noopener noreferrer',
        target: '_blank',
        style: 'reverse',
      },
      {
        path: `mailto: ${process.env.NEXT_PUBLIC_USER_EMAIL}`,
        title: 'Email',
        rel: 'noopener noreferrer',
        target: '_blank',
        style: 'reverse',
      },
    ],
  },
  intro: {
    items: [
      `Design Engineer with 10+ years of experience based in Portland, OR.`,
      `I've collaborated with renowned brands including Nike, BASIC/DEPT®, Columbia Sportswear, SOREL, and KEEN Footwear.`,
      `I combine form and function to create innovative digital products that delight users and drive results.`,
    ],
  },
};

export const timelineContent = {
  meta: {
    title: 'Career Timeline',
  },
  fullStory: {
    text: 'Read the full story...',
    link: '/blog/2021-a-dev-odyssey',
  },
  items: [
    {
      content: 'Present',
      cName: 'date',
    },
    {
      title: 'Software Engineer II @ Nike',
      content:
        'Working with Nike Global Technology teams building enterprise tools and software using React.',
      cName: 'event',
    },
    {
      title: 'Software Engineer II @ Nike',
      content:
        'Developing digital prototypes and tools for designers @ Nike LeBron James Innovation Center.',
      cName: 'event',
    },
    {
      content: '2022',
      cName: 'date',
    },
    {
      content: '2021',
      cName: 'date',
    },
    {
      title: 'Built open-source Blog & CMS',
      content:
        'Building, maintaining a Next.js Blog & CMS in TypeScript. Began blogging about React, Markdown, and my personal career journey.',
      cName: 'event',
    },
    {
      title: 'Journey into React and TypeScript',
      content:
        'Pivoted away from Salesforce Commerce Cloud and into React, Next.js, TypeScript, and modern web development.',
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
        'Delivered Salesforce Commerce Cloud code in an agency environment for many clients including Hanna Andersson and Leatherman.',
      cName: 'event',
    },
    {
      title: 'Lead UI Engineer @ KEEN Footwear',
      content:
        'Collaborated with BASIC/DEPT® to design and build KEEN Footwear and Chrome Industries Salesforce Commerce Cloud experiences.',
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
        'My first experience with Agile Scrum. Developed Salesforce Commerce Cloud code for Columbia, SOREL, and Mountain Hardwear.',
      cName: 'event',
    },
    {
      title: 'Frontend Dev @ Dealer Spike',
      content:
        'Built websites for Powersports dealerships across the USA and Canada using HTML, CSS, and jQuery. Designed in Photoshop.',
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
      title: 'Freelance Web Design',
      content:
        'Started a freelance business that eventually served ~30 clients. Developed small to medium size websites using HTML, CSS, JS and Flash.',
      cName: 'event',
    },
    {
      title: 'UI Designer @ Selliken Systems',
      content:
        'Worked on the HomeQuest real estate property search tool. Designed UI in Adobe Photoshop and produced animations in Flash.',
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
      title: 'Web Design @ Southridge High',
      content: `Created Macromedia Flash websites in my school's TV Studio. Took an intro to Web Design course sophomore year.`,
      cName: 'event',
    },
    {
      title: 'HTML & CSS in Geocities',
      content:
        'Learned the basics of HTML/CSS in Yahoo! Geocities. I realized the joy of creating a personal website that anyone in the world could view.',
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
        'My family got a Compaq Presario CDS 524. I read lots of Microsoft Encarta and played "Where in the World is Carmen San Diego" and "X-Wing".',
      cName: 'event',
    },
  ],
};

export const thanksContent = {
  meta: {
    title: `Thank You — ${appTitle}`,
    description: 'Thanks for your contribution.',
  },
  heading: 'Thank You.',
  copy: `Your support means the world to me, and I am immensely grateful for your contribution. This project is the result of countless hours of passion and dedication, and I'm thrilled to share it with you. I look forward to creating more in the future. —Amir`,
};

export const usesContent = {
  meta: {
    title: `Uses — ${appTitle}`,
    description: 'A list of gear, tools, and software I use.',
  },
  heading: `Uses — ${appTitle}`,
  devices: {
    content: `### Devices
  #### Laptop
  - 14" M3 MacBook Pro
  - Silver
  ##### Specs:
  - M3 Pro
  - 12-core CPU
  - 18-core GPU
  - 36GB RAM
  - 1TB SSD
  ---
  #### Desktop
  - Custom PC
  ##### Specs:
  - Intel i7-14700KF 5.6GHz
  - Deepcool LT720 AIO
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
  ##### Interface
  - Motu Audio Express
  ##### Monitors
  - KRK VXT 8
  ##### Headphones
  - Beyerdynamic DT770Pro
  - Sennheiser HD25-1 II
  - Apple AirPods Pro (2nd gen.)
  ##### MIDI Controllers
  - Korg nanoKONTROL 1
  - Korg nanoPAD 1
  `,
  },
  tools: {
    content: `### Tools
  #### IDE
  - VS Code
  ##### VS Code Extensions:
  - GitHub Copilot
  - Tokyo Night
  - Material Icon Theme
  - Tailwind CSS IntelliSense
  - vscode-styled-components
  - Prisma
  - ESLint
  - GitLens
  - Prettier

  ---
  #### Browser
  - Brave
  ##### Chrome Extensions:
  - React Developer Tools
  - uBlock Origin
  - Stylebot

  ---
  #### Testing
  ##### React/JS:
  - Jest
  - React Testing Library
  ##### iOS/Safari:
  - Xcode Simulator

  `,
  },
  stack: {
    content: `### Stack

  #### Web Dev
  - Next.js
  - TypeScript
  - Emotion
  - Tailwind CSS
  - PostgreSQL
  - Supabase
  - Prisma
  - SWR
  - React-Markdown
  - React Syntax Highlighter
  - React Testing Library
  - Vercel
  - Cloudinary

  ---
  #### Shell
  - macOS: iTerm 2
  - Win: Powershell 7
  - Powerlevel10k
  ##### CLI
  - GitHub CLI
  - Vercel CLI
  - Supabase CLI

  ---
  #### AI
  - GitHub Copilot
  - xAI Grok

  `,
  },
  software: {
    content: `### Software
  
  #### Writing
  - iA Writer

  ---
  #### Design / Photo
  - Figma
  - Adobe Lightroom
  - Aseprite
  - Excalidraw

  ---
  #### Music Production
  - Ableton Live 12
  ##### VSTs:
  - Synapse Audio Dune 3
  - Serum by Xfer Records
  - Waves API 2500
  - Waves C1 Compressor
  - Waves H-Delay
  - Waves L2 Ultramaximizer
  - Waves Renaissance Bass
  - Waves TrueVerb
  - FabFilter Pro-Q 2
  - Valhalla Super Massive
  - Valhalla VintageVerb
  - Sonic Academy Kick 2
  
  ---
  #### Listening
  - YouTube Music
  - Apple Podcasts
  
  `,
  },
};

export const photosContent = {
  meta: {
    title: `Photos — ${appTitle}`,
    description:
      'Photo gallery of Amir Ardalan. Primarily portrait shots captured on an iPhone.',
  },
  heading: `Photos — ${appTitle}`,
};

export const errorContent = {
  notFound: {
    meta: {
      title: `Page Not Found — ${appTitle}`,
    },
    title: '404',
    text: `🚫 Page not found`,
    link: {
      path: '/',
      title: 'Return Home',
    },
    quote: `"The best thing about a boolean is even if you are wrong, you are only off by a bit."`,
    author: 'Unknown',
  },
  internalServerError: {
    meta: {
      title: `Internal Server Error — ${appTitle}`,
    },
    title: '500',
    text: `⚠️ Internal server error`,
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
      title: 'X',
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
      path: '/resume',
      title: 'Resume',
    },
    {
      path: `mailto:${emailAddress}`,
      title: 'Email',
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
    title: ` — ${appTitle}`,
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
      title: `Create — ${appTitle}`,
    },
  },
  drafts: {
    meta: {
      title: `Drafts — ${appTitle}`,
    },
    notice: `Unpublished Draft`,
    empty: `No drafts. Nice and tidy! Perhaps`,
    empty2: 'try writing',
    empty3: 'one?',
  },
};
