<script setup lang="ts">
const { data: posts } = await usePosts()
usePageSeo({ title: 'Developer Distinction' })
</script>

<template>
  <section>
    <h1>Developer Distinction</h1>
    <p>
      Michael Born — Fullstack software engineer. When I'm not debating the finer
      points of software development, I can be found pedaling furiously along a
      winding country road.
    </p>
    <h2>Recent posts</h2>
    <PostList :posts="posts ?? []" />
  </section>
</template>
