<script setup lang="ts">
const { data: posts } = await usePosts()
const tags = computed(() => [...new Set((posts.value ?? []).flatMap(post => post.tags))].sort())
</script>

<template>
  <section>
    <h1>Tags</h1>
    <ul>
      <li v-for="tag in tags" :key="tag">
        <NuxtLink :to="`/tags/${tag}/`">{{ tag }}</NuxtLink>
        ({{ (posts ?? []).filter(post => post.tags.includes(tag)).length }})
      </li>
    </ul>
  </section>
</template>
