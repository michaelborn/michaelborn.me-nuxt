<script setup lang="ts">
defineProps<{
  post: { path: string, title: string, date: string, description?: string }
}>()
</script>

<template>
  <article class="group relative">
    <time
      class="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-gray-400 dark:text-gray-500"
      :datetime="post.date"
    >
      <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
        <span class="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500" />
      </span>
      {{ formatPostDate(post.date) }}
    </time>
    <h2
      class="text-base font-semibold tracking-tight text-gray-800 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400"
    >
      <NuxtLink :to="postUrl(post.path)">
        <span class="absolute inset-0 z-20" aria-hidden="true" />
        {{ post.title }}
      </NuxtLink>
    </h2>
    <p v-if="post.description" class="relative z-10 mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
      {{ post.description }}
    </p>
  </article>
</template>
