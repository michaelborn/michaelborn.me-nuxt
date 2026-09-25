<script setup lang="ts">
const route = useRoute()

const items = [
  { name: 'Home', path: '/', icon: 'solar:home-smile-outline' },
  { name: 'Posts', path: '/posts/', icon: 'solar:document-text-outline' },
  { name: 'Tags', path: '/tags/', icon: 'solar:hashtag-outline' },
]

const stripSlash = (path: string) => path.replace(/\/$/, '') || '/'
const isActive = (path: string) => stripSlash(route.path) === stripSlash(path)
</script>

<template>
  <div class="fixed top-0 z-50 w-full">
    <nav aria-label="Main navigation" class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <ul
        class="my-4 flex items-center rounded-full bg-white/90 px-3 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-900/5 backdrop-blur dark:bg-gray-800/90 dark:text-gray-200 dark:ring-white/20"
      >
        <li v-for="item in items" :key="item.path">
          <NuxtLink
            :to="item.path"
            :title="item.name"
            class="relative flex items-center justify-center px-3 py-4 transition hover:text-primary-500 dark:hover:text-primary-400"
            :class="{ 'text-primary-600 dark:text-primary-400': isActive(item.path) }"
          >
            <Icon aria-hidden="true" :name="item.icon" class="z-10 h-5 w-5" />
            <span
              v-if="isActive(item.path)"
              class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary-500/0 via-primary-500/70 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0"
            />
            <span
              v-if="isActive(item.path)"
              class="absolute top-1/2 left-1/2 z-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 dark:bg-white/10"
            />
            <span class="sr-only">{{ item.name }}</span>
          </NuxtLink>
        </li>
        <li>
          <a
            href="/index.xml"
            title="RSS"
            class="relative flex items-center justify-center px-3 py-4 transition hover:text-primary-500 dark:hover:text-primary-400"
          >
            <Icon aria-hidden="true" name="mdi:rss" class="z-10 h-5 w-5" />
            <span class="sr-only">RSS</span>
          </a>
        </li>
        <li class="flex-1" />
        <li>
          <AppThemeToggle />
        </li>
      </ul>
    </nav>
  </div>
</template>
