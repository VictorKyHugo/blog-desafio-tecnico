<template>
  <section class="post-view__author">
    <img
      class="post-view__author__picture"
      :src="`https://randomuser.me/api/portraits/women/${user.id}.jpg`"
    />
    <h3 class="post-view__author__name">{{ user.name }}</h3>
    <span class="post-view__author__phone">{{ user.phone }}</span>
    <p class="post-view__author__description">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    </p>
    <div class="post-view__author__more-posts">
      <h2 class="post-view__author__more-posts__title">Posts Relacionados</h2>
      <Card
        v-for="post in authorPosts"
        class="post-view__author__more-posts__post"
        :author="getUserNameById(post.userId)"
        :key="post.id"
        :post-id="post.id"
        :author-id="post.userId"
        :is-compact="true"
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
  </section>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/blog';
import { useRouter } from 'vue-router';
import Card from '../../components/CardComponent.vue';

const store = useBlogStore();
const { getUserNameById } = store;

// Router

const router = useRouter();

const handleReadMore = (id: number) => {
  router.push(`/post/${id}`);
};

defineProps<{
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
  };
  authorPosts: {
    id: number;
    userId: number;
    title: string;
    content: string;
  }[];
}>();
</script>
