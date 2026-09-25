export const site = {
  url: 'https://www.michaelborn.me',
  title: 'Developer Distinction',
  description: 'Articles on CFML, JavaScript, and software development by Michael Born.',
  author: 'Michael Born',
  email: 'michaelborn@duck.com',
}

export const socials = [
  { name: 'GitHub', url: 'https://github.com/michaelborn', icon: 'mdi:github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/michaeltheborn/', icon: 'mdi:linkedin' },
  { name: 'X', url: 'https://x.com/michaelborn_me', icon: 'simple-icons:x' },
]

export function canonicalPath(path: string) {
  return path === '/' ? '/' : `${path.replace(/\/$/, '')}/`
}
