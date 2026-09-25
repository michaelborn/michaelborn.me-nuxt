export function recentPosts() {
  return useAsyncData('published-posts', async () => {
    const posts = await queryCollection('posts')
      .select('path', 'title', 'date', 'tags', 'description')
      .limit(5)
      .all()
    return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.path.localeCompare(b.path))
  })
}
