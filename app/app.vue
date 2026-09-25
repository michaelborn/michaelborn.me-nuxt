<script setup lang="ts">
useHead({
  htmlAttrs: { class: "h-full scroll-smooth" },
  bodyAttrs: { class: "antialiased bg-gray-50 dark:bg-black min-h-screen" },
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#14b8a6" />
    <AppNavbar />
    <div class="h-32" />
    <main class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <NuxtPage />
    </main>
    <div class="h-32" />
    <footer
      class="mx-auto max-w-md px-4 pb-8 text-sm text-gray-400 sm:px-6 lg:px-8 dark:text-gray-600"
    >
      <FooterSocialLinks />
      <FooterCopyright />
    </footer>
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
