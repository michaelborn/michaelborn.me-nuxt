<script setup lang="ts">
defineProps<{
  posts: { path: string, title: string, date: string, description?: string }[]
}>()
</script>

<template>
  <ul class="post-list space-y-16">
    <li v-for="post in posts" :key="post.path">
      <AppArticleCard :post="post" />
    </li>
  </ul>
</template>
