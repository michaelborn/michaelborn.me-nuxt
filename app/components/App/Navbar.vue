<script setup lang="ts">
const route = useRoute();

const items = [
  { name: "Posts", path: "/posts/" },
  { name: "Tags", path: "/tags/" },
  { name: "About", path: "/about/" },
];

const stripSlash = (path: string) => path.replace(/\/$/, "") || "/";
const isActive = (path: string) => stripSlash(route.path) === stripSlash(path);
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200 bg-gray-50/90 backdrop-blur dark:border-gray-800 dark:bg-black/90"
  >
    <nav
      aria-label="Main navigation"
      class="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="text-sm font-semibold tracking-tight text-gray-800 transition hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
      >
        Michael Born
      </NuxtLink>
      <ul class="flex items-center text-sm font-medium">
        <li v-for="item in items" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="px-2.5 py-2 transition sm:px-3"
            :class="[
              isActive(item.path)
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
        <li>
          <a
            href="/index.xml"
            title="RSS"
            class="flex items-center px-2.5 py-2 text-gray-500 transition hover:text-gray-800 sm:px-3 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Icon aria-hidden="true" name="mdi:rss" class="h-5 w-5" />
            <span class="sr-only">RSS</span>
          </a>
        </li>
        <li class="ml-1">
          <AppThemeToggle />
        </li>
      </ul>
    </nav>
  </header>
</template>
