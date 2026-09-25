<script setup lang="ts">
import { socials } from '#shared/site'
</script>

<template>
  <div>
    <h2 class="mb-4 text-xs font-semibold uppercase text-gray-400">Find me on</h2>
    <div class="space-y-5">
      <NuxtLink
        v-for="link in socials"
        :key="link.icon"
        :to="link.url"
        target="_blank"
        external
        class="group flex items-end gap-4 dark:hover:text-gray-300"
      >
        <span class="text-sm">
          {{ link.name }}
        </span>
        <div class="flex-1 border-b border-dashed border-gray-300 group-hover:border-gray-700 dark:border-gray-800" />
        <Icon :name="link.icon" class="h-6 w-6" />
      </NuxtLink>
    </div>
  </div>
</template>
