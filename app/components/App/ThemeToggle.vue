<script setup lang="ts">
const colorMode = useColorMode()

const toggle = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    title="Toggle theme"
    class="relative flex items-center justify-center px-3 py-4 transition hover:text-primary-500 dark:hover:text-primary-400"
    @click="toggle"
  >
    <Icon aria-hidden="true" name="solar:sun-2-outline" class="hidden h-5 w-5 dark:block" />
    <Icon aria-hidden="true" name="solar:moon-outline" class="h-5 w-5 dark:hidden" />
    <span class="sr-only">Toggle theme</span>
  </button>
</template>
