<script setup lang="ts">
import { socials } from "#shared/site";
</script>

<template>
  <ul class="flex items-center gap-1">
    <li v-for="link in socials" :key="link.icon">
      <a
        :href="link.url"
        target="_blank"
        rel="noopener"
        :title="link.name"
        class="flex items-center px-2 py-2 text-gray-400 transition hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
      >
        <Icon :name="link.icon" aria-hidden="true" class="h-5 w-5" />
        <span class="sr-only">{{ link.name }}</span>
      </a>
    </li>
  </ul>
</template>
