import { themeLight, themeDark } from "@/styles/theme"

export const nav = [
  {
    title: 'Home',
    path: '/',
    exact: 'false',
    cName: 'homeNav',
    aria: 'Home',
    icon: false
  },
  {
    title: 'Blog',
    path: '/blog',
    exact: '',
    cName: 'blogNav',
    aria: 'Blog',
    icon: false
  },
  {
    title: 'About',
    path: '/about',
    exact: '',
    cName: 'aboutNav',
    aria: 'About',
    icon: false
  },
  // {
  //   title: 'NFT',
  //   path: '/nft',
  //   exact: '',
  //   cName: 'nftNav',
  //   aria: 'NFT',
  //   icon: false
  // },
  {
    title: 'Timeline',
    path: '/about#timeline',
    exact: '',
    cName: 'excludeInHeader',
    aria: 'Career Timeline',
    icon: false
  },
  {
    title: 'Uses',
    path: '/uses',
    exact: '',
    cName: 'excludeInHeader',
    aria: 'Tools I Use',
    icon: false
  },
  {
    title: 'Spotify',
    path: '/spotify',
    exact: '',
    cName: 'spotifyNav',
    aria: 'Spotify Dashboard',
    icon: {
      light: themeLight.icons.spotify,
      dark: themeDark.icons.spotify
    },
  }
]