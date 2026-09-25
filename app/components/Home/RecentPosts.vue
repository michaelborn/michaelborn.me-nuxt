<script setup lang="ts">
const { data: posts } = await recentPosts();
</script>

<template>
  <div>
    <h2 class="mb-6 text-xs font-semibold uppercase text-gray-400">
      Recent posts
    </h2>
    <PostList :posts="posts ?? []" />
    <div class="mt-6 flex items-center justify-center text-sm">
      <NuxtLink
        to="/posts/"
        class="text-gray-500 transition hover:text-primary-600 dark:hover:text-primary-400"
      >
        All Posts &rarr;
      </NuxtLink>
    </div>
  </div>
</template>
