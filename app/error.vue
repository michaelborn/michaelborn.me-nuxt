<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
useHead({ title: 'Page unavailable — Developer Distinction' })
useSeoMeta({ robots: 'noindex' })
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
    <h1 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
      {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
    </h1>
    <p class="mt-4 text-gray-600 dark:text-gray-400">
      {{ error.statusCode === 404 ? 'This page does not exist.' : 'Please try again later.' }}
    </p>
    <a
      href="/"
      class="mt-6 font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
    >Return home</a>
  </main>
</template>
