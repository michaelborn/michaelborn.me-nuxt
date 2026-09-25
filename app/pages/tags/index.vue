<script setup lang="ts">
const { data: posts } = await usePosts()
const tags = computed(() => [...new Set((posts.value ?? []).flatMap(post => post.tags))].sort())
const countFor = (tag: string) => (posts.value ?? []).filter(post => post.tags.includes(tag)).length
usePageSeo({ title: 'Tags', description: 'Browse articles by topic on Developer Distinction.' })
</script>

<template>
  <div>
    <AppHeader class="mb-16" title="Tags" description="Browse articles by topic." />
    <ul class="space-y-4">
      <li v-for="tag in tags" :key="tag" class="flex items-baseline gap-2">
        <NuxtLink
          :to="`/tags/${tag}/`"
          class="font-medium text-gray-800 transition hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
        >{{ tag }}</NuxtLink>
        <span class="text-sm text-gray-400 dark:text-gray-500">({{ countFor(tag) }})</span>
      </li>
    </ul>
  </div>
</template>
