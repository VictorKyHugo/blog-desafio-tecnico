<template>
  <div class="header">
    <BackIcon
      v-if="!isHomePage"
      data-test="icon"
      class="header__back-icon"
      @click="backToLastPage"
    />
    <h1 @click="backToHomePage" data-test="logo" class="header__logo">BlogMock</h1>
  </div>
  <div class="header__hr"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BackIcon from './icons/BackIcon.vue';

const router = useRouter();
const route = useRoute();

const isHomePage = computed(() => route.name === 'home');

const backToLastPage = (): void => {
  router.back();
};

const backToHomePage = (): void => {
  router.push('/');
};
</script>
