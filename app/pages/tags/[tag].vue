<script setup lang="ts">
definePageMeta({ key: route => route.path })
const route = useRoute()
const tag = String(route.params.tag)
const { data: posts } = await usePosts()
const matchingPosts = computed(() => (posts.value ?? []).filter(post => post.tags.includes(tag)))

if (!matchingPosts.value.length) {
  throw createError({ statusCode: 404, statusMessage: 'Tag not found', fatal: true })
}

usePageSeo({ title: `Posts tagged “${tag}”`, description: `Articles about ${tag} by Michael Born.` })
</script>

<template>
  <div>
    <AppHeader class="mb-16" :title="`Posts tagged “${tag}”`" :description="`Articles about ${tag}.`" />
    <PostList :posts="matchingPosts" />
  </div>
</template>
