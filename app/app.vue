<script setup lang="ts">
useHead({
  htmlAttrs: { class: "h-full scroll-smooth" },
  bodyAttrs: { class: "antialiased bg-gray-50 dark:bg-black min-h-screen" },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NuxtLoadingIndicator color="#14b8a6" />
    <AppNavbar />
    <main class="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
