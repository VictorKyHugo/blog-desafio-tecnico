<template>
  <div @click="handleReadMore" data-test="card" class="card">
    <img class="card__thumbnail" src="https://picsum.photos/400/200?random=34" />
    <div class="card__wrapper">
      <div class="card__wrapper__info">
        <h4 class="card__wrapper__info__title">
          <slot name="title"></slot>
        </h4>
        <p class="card__wrapper__info__content">
          <slot name="content"></slot>
        </p>
      </div>
      <div class="card__wrapper__footer">
        <div class="card__wrapper__footer__author">
          <img
            class="card__wrapper__footer__author__profile-picture"
            src="https://randomuser.me/api/portraits/thumb/women/12.jpg"
          />
          <span class="card__wrapper__footer__author__name">{{ author }}</span>
        </div>
        <button class="card__wrapper__footer__read-more">Ler Artigo</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  author: string;
}>();

const emit = defineEmits(['onReadMore']);

const handleReadMore = () => {
  emit('onReadMore');
};
</script>
