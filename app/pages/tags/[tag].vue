<script setup lang="ts">
definePageMeta({ key: route => route.path })
const route = useRoute()
const tag = String(route.params.tag)
const { data: posts } = await usePosts()
const matchingPosts = computed(() => (posts.value ?? []).filter(post => post.tags.includes(tag)))

if (!matchingPosts.value.length) {
  throw createError({ statusCode: 404, statusMessage: 'Tag not found', fatal: true })
}
</script>

<template>
  <section>
    <h1>Posts tagged “{{ tag }}”</h1>
    <PostList :posts="matchingPosts" />
  </section>
</template>
