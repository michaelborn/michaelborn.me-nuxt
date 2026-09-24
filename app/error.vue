<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
useHead({ title: 'Page unavailable — Developer Distinction' })
useSeoMeta({ robots: 'noindex' })
</script>

<template>
  <main class="site-shell">
    <h1>{{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}</h1>
    <p>{{ error.statusCode === 404 ? 'This page does not exist.' : 'Please try again later.' }}</p>
    <a href="/">Return home</a>
  </main>
</template>
