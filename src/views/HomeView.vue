<template>
  <div class="home">
    <Header />
    <div class="home__cards">
      <Card
        class="home__cards__card"
        v-for="post in postsToRender(itemsPerPage, currentPage)"
        :author="getUserNameById(post.userId)"
        :author-id="post.userId"
        :post-id="post.id"
        :key="post.id"
      >
        <template #title>
          {{ post.title }}
        </template>
        <template #content>
          {{ post.content }}
        </template>
      </Card>
    </div>

    <div class="home__paginate">
      <VueAwesomePaginate
        :total-items="posts.length"
        :items-per-page="itemsPerPage"
        :max-pages-shown="3"
        v-model="currentPage"
        :on-click="onClickHandler"
      />
    </div>
  </div>
</template>
<script async setup lang="ts">
import { ref } from 'vue';
import { useBlogStore } from '@/stores/blog';
import { storeToRefs } from 'pinia';

import Card from '../components/CardComponent.vue';
import Header from '../components/HeaderComponent.vue';

// Store
const store = useBlogStore();
const { getUserNameById, postsToRender, fetchBlogData } = store;
const { posts } = storeToRefs(store);

fetchBlogData();

// Paginate
const currentPage = ref(1);
const itemsPerPage = ref(8);

const onClickHandler = (page: number) => {
  currentPage.value = page;
};
</script>
