<script setup lang="ts">
definePageMeta({ key: route => route.path })
const route = useRoute()
const { data: post } = await useAsyncData(`post:${route.params.slug}`, () =>
  queryCollection('posts').path(`/posts/${route.params.slug}`).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}
</script>

<template>
  <article v-if="post">
    <header>
      <h1>{{ post.title }}</h1>
      <p><time :datetime="post.date">{{ formatPostDate(post.date) }}</time></p>
      <ul aria-label="Post tags">
        <li v-for="tag in post.tags" :key="tag">
          <NuxtLink :to="`/tags/${tag}/`">{{ tag }}</NuxtLink>
        </li>
      </ul>
    </header>
    <ContentRenderer :value="post" />
  </article>
</template>
