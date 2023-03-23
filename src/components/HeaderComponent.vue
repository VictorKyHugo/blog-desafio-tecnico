<template>
  <div class="header">
    <h1 @click="backToHomePage" data-test="logo" class="header__logo">BlogMock</h1>
  </div>
  <div class="header__hr"></div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const backToHomePage = (): void => {
  router.push('/');
};
</script>
