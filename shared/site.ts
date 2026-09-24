export const site = {
  url: 'https://www.michaelborn.me',
  title: 'Developer Distinction',
  description: 'Articles on CFML, JavaScript, and software development by Michael Born.',
  author: 'Michael Born',
  email: 'michaelborn@duck.com',
}

export function canonicalPath(path: string) {
  return path === '/' ? '/' : `${path.replace(/\/$/, '')}/`
}
