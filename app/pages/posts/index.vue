<script setup lang="ts">
const { data: posts } = await allPosts();
const years = computed(() =>
  [...new Set((posts.value ?? []).map((post) => post.date.slice(0, 4)))]
    .sort()
    .reverse(),
);
usePageSeo({
  title: "All posts",
  description: "Browse every article by Michael Born, organized by year.",
});
</script>

<template>
  <div>
    <AppHeader
      class="mb-16"
      title="All posts"
      description="Every article I've written, collected in reverse chronological order."
    />
    <section v-for="year in years" :key="year" class="mb-16 last:mb-0">
      <h2 class="mb-6 text-xs font-semibold uppercase text-gray-400">
        {{ year }}
      </h2>
      <PostList
        :posts="(posts ?? []).filter((post) => post.date.startsWith(year))"
      />
    </section>
  </div>
</template>
