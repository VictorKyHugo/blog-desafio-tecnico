<template>
  <div class="post-view__comments">
    <div class="post-view__comments__hr"></div>
    <h2 class="post-view__comments__title">Comentários</h2>
    <div class="post-view__comments__comment" v-for="(comment, index) in comments" :key="index">
      <img
        class="post-view__comments__comment__picture"
        :src="`https://randomuser.me/api/portraits/men/${index}.jpg`"
      />
      <div class="post-view__comments__comment__body">
        <div class="post-view__comments__comment__body__name">
          {{ comment.name }}
        </div>
        <div class="post-view__comments__comment__body__content">
          {{ comment.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  comments: {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
  }[];
}>();
</script>
