<template>
  <div class="site-shell">
    <header>
      <NuxtLink to="/">Developer Distinction</NuxtLink>
      <nav aria-label="Main navigation">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/posts/">Posts</NuxtLink>
        <NuxtLink to="/tags/">Tags</NuxtLink>
        <a href="/index.xml">RSS</a>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>
