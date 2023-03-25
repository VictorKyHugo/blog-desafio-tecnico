<template>
  <Suspense>
    <router-view :key="route.fullPath"></router-view>
  </Suspense>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
