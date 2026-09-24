<script setup lang="ts">
const { data: posts } = await usePosts()
const years = computed(() => [...new Set((posts.value ?? []).map(post => post.date.slice(0, 4)))].sort().reverse())
usePageSeo({ title: 'All posts', description: 'Browse every article by Michael Born, organized by year.' })
</script>

<template>
  <section>
    <h1>All posts</h1>
    <section v-for="year in years" :key="year">
      <h2>{{ year }}</h2>
      <PostList :posts="(posts ?? []).filter(post => post.date.startsWith(year))" />
    </section>
  </section>
</template>
