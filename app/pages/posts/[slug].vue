<script setup lang="ts">
definePageMeta({ key: route => route.path })
const route = useRoute()
const { data: post } = await useAsyncData(`post:${route.params.slug}`, () =>
  queryCollection('posts').path(`/posts/${route.params.slug}`).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

usePageSeo({
  title: post.value.title,
  description: post.value.description,
  publishedAt: post.value.date,
  tags: post.value.tags,
})
</script>

<template>
  <article v-if="post">
    <header class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        {{ post.title }}
      </h1>
      <time
        class="relative z-10 mt-4 flex items-center pl-3.5 text-sm text-gray-400 dark:text-gray-500"
        :datetime="post.date"
      >
        <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span class="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500" />
        </span>
        {{ formatPostDate(post.date) }}
      </time>
      <ul v-if="post.tags.length" aria-label="Post tags" class="mt-4 flex flex-wrap gap-2">
        <li v-for="tag in post.tags" :key="tag">
          <NuxtLink
            :to="`/tags/${tag}/`"
            class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 transition hover:bg-primary-100 hover:text-primary-700 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-primary-400/20 dark:hover:text-primary-300"
          >{{ tag }}</NuxtLink>
        </li>
      </ul>
    </header>
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-img:rounded-lg prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10"
    >
      <ContentRenderer :value="post" />
    </div>
  </article>
</template>
