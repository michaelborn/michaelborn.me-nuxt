export function postUrl(path: string) {
  return `${path.replace(/\/$/, '')}/`
}

export function formatPostDate(date: string) {
  // Keep the author's publication date, independent of server/browser timezone.
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date.slice(0, 10)}T12:00:00Z`))
}
