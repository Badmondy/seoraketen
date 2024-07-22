<template>
  <main>
    <div class="row p-0 m-0 main-content">
      <aside class="aside"></aside>
      <div class="col">
        <RouterView/>
      </div>
    </div>
    <footer class="position-absolute" style="bottom: 0; left: 50%; transform: translateX(-50%);">
      <a href="#" class="nav-link">Copyright @ 2024</a>
    </footer>
  </main>
</template>
<script setup>
import { RouterView } from 'vue-router'
</script>