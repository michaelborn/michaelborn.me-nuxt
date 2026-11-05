export function recentPosts() {
  return useAsyncData('recent-posts', async () => {
    const posts = await queryCollection('posts')
      .select('path', 'title', 'date', 'tags', 'description')
      .all()
    return posts
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.path.localeCompare(b.path))
      .slice(0, 5)
  })
}
