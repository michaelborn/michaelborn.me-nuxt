<script setup lang="ts">
defineProps<{
  posts: { path: string, title: string, date: string }[]
}>()
</script>

<template>
  <ul class="post-list">
    <li v-for="post in posts" :key="post.path">
      <NuxtLink :to="postUrl(post.path)">{{ post.title }}</NuxtLink>
      — <time :datetime="post.date">{{ formatPostDate(post.date) }}</time>
    </li>
  </ul>
</template>
