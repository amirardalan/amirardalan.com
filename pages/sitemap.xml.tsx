import { GetServerSideProps } from 'next'
import fs from 'fs'
import path from 'path'

export default function Sitemap() {}

type Url = {
  host: string
  route: string
  date?: Date
}

const excludedRoutes: Array<string> = [
  '/404',
  '/sitemap.xml',
  '/blog/[slug]',
  '/blog/edit',
  '/blog/create',
  '/blog/drafts',
  '/api/auth/[...nextauth]',
  '/api/post',
  '/api/post/[id]',
  '/api/publish/[id]',
  '/api/update',
]

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const basePath: string = process.cwd()
  const routes_manifest: object = ReadManifestFile(basePath)
  const host: string = 'https://amirardalan.com'

  let routes: Array<Url> = GetPathsFromManifest(routes_manifest, host)
  const pagesPath = path.join(basePath + '/.next/serverless/pages')
  routes = routes.concat(GetPathsFromBuildFolder(pagesPath, [], host, pagesPath))

  routes = routes.filter((el) => !excludedRoutes.includes(el.route))
  const sitemap: string = GetSitemapXml(routes)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
  return { props: {} }
}

const ReadManifestFile = (basePath: string): object => {
  const routes_manifest_path = path.join(basePath + '/.next/serverless/pages-manifest.json')

  // Read from the file
  if (fs.existsSync(routes_manifest_path)) {
    const raw_json = fs.readFileSync(routes_manifest_path)
    return JSON.parse(raw_json.toString())
  } else return null
}

const GetPathsFromManifest = (manifest: any, host: string): Array<Url> => {
  let routes: Array<string> = []

  for (let [route, file] of Object.entries(manifest)) {
    if (!isNextInternalUrl(route)) {
      // Add static paths
      routes = routes.concat(route)
    }
  }

  let sitemapUrls: Array<Url> = []
  routes.forEach((route) => {
    sitemapUrls.push({ host: host, route: route })
  })

  return sitemapUrls
}

const GetPathsFromBuildFolder = (dir: string, urlList: Array<Url>, host: string, basePath: string): Array<Url> => {
  const dirContent: string[] = fs.readdirSync(dir)
  urlList = urlList || []

  dirContent.forEach((dirItem) => {
    if (fs.statSync(dir + dirItem).isDirectory()) {
      urlList = GetPathsFromBuildFolder(dir + dirItem + '/', urlList, host, basePath)
    } else {
      if (path.extname(dirItem) == '.json') {
        let route = path.join(dir + dirItem.substring(0, dirItem.length - 5))
        route = route.replace(basePath, '/')
        urlList.push({ host: host, route: route })
      }
    }
  })

  console.log(urlList)

  return urlList
}

const GetUrlElement = ({ host, route, date }: Url): string => {
  if (date) {
    return `<url><loc>${host}${route}</loc><lastmod>${date}</lastmod></url>`
  } else return `<url><loc>${host}${route}</loc></url>`
}

const GetSitemapXml = (urls: Array<Url>): string => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => GetUrlElement(url)).join('')}
    </urlset>`

const isNextInternalUrl = (path: string): boolean => {
  return new RegExp(/[^\/]*^.[_]|(?:\[)/g).test(path)
}