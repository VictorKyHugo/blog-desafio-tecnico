<template>
  <div class="card">
    <img
      @click="handleReadMore"
      class="card__thumbnail"
      src="https://picsum.photos/400/200?random=34"
    />
    <div class="card__wrapper">
      <div @click="handleReadMore" class="card__wrapper__info">
        <h4 class="card__wrapper__info__title">
          <slot name="title"></slot>
        </h4>
        <p class="card__wrapper__info__content">
          <slot name="content"></slot>
        </p>
      </div>
      <div class="card__wrapper__footer">
        <div @click="handleAuthorClick" class="card__wrapper__footer__author">
          <div class="card__wrapper__footer__author__profile-picture">
            {{ profilePicture }}
          </div>
          <span class="card__wrapper__footer__author__name">{{ author }}</span>
        </div>
        <button @click="handleReadMore" class="card__wrapper__footer__read-more">Ler Artigo</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  author: string;
}>();

const emit = defineEmits(['onAuthorClick', 'onReadMore']);

const handleAuthorClick = () => {
  emit('onAuthorClick');
};

const handleReadMore = () => {
  emit('onReadMore');
};

const profilePicture = computed(() => {
  const authorFirstLetter = props.author.split('')[0];
  return authorFirstLetter;
});
</script>
