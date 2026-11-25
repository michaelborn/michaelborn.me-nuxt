<script setup lang="ts">
import { socials } from "#shared/site";

usePageSeo({
  title: "About Me",
  description: "About Michael Born, fullstack software engineer.",
});
usePersonJsonLd();
</script>

<template>
  <div>
    <AppHeader
      class="mb-16"
      title="About Me"
      description="Software engineer and blogger."
    />
    <div class="prose dark:prose-invert">
      <p>
        I'm Michael Born, a 15-year software engineer specializing in fullstack development. Grew up in the sticks, and moved to... the sticks. 😜
      </p>
      <p>
        I write about my experiences working with Elasticsearch and the full CFML/JS stack at <a href="https://www.ortussolutions.com/" target="_blank" rel="noopener">Ortus Solutions, Corp</a>.
      </p>

      <h2>AI policy</h2>
      <p>
        All words (and opinions) are my own, but I do use AI assistants for research, typo detection, and fact-checking.
      </p>
<!-- 
      <h2>Elsewhere</h2>
      <ul>
        <li v-for="link in socials" :key="link.icon">
          <a :href="link.url" target="_blank" rel="noopener">{{ link.name }}</a>
        </li>
      </ul> -->
    </div>
  </div>
</template>
