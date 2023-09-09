<template>
  <div
    class="bg-[url('assets/imgs/bg.png')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden"
  >
    <Suspense>
      <Layout />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import Layout from "./pages/layout.vue";
</script>
