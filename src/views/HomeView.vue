<template>
  <div class="home">
    <Header />
    <div class="home__cards">
      <Card
        v-for="post in getPostsToRender(itemsPerPage, currentPage)"
        class="home__cards__card"
        :author="getUserNameById(post.userId)"
        :author-id="post.userId"
        :post-id="post.id"
        :key="post.id"
        @on-read-more="() => handleReadMore(post.id)"
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
import { useRouter } from 'vue-router';

import Card from '../components/CardComponent.vue';
import Header from '../components/HeaderComponent.vue';

// Store
const store = useBlogStore();
const { getUserNameById, getPostsToRender, fetchBlogData } = store;
const { posts } = storeToRefs(store);

await fetchBlogData();

// Paginate
const currentPage = ref(1);
const itemsPerPage = ref(8);

const onClickHandler = (page: number) => {
  currentPage.value = page;
};

// Router

const router = useRouter();

const handleReadMore = (id: number) => {
  router.push(`/post/${id}`);
};
</script>
