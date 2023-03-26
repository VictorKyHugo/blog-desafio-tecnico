<template>
  <Header />
  <RouterView :key="route.fullPath" v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <component :is="Component"></component>
            <template #fallback> Loading... </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from './components/HeaderComponent.vue';
const route = useRoute();
</script>
