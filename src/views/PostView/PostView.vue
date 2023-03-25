<template>
  <div>
    <Header />
    <div class="post-view">
      <div class="post-view__content">
        <h1 class="post-view__content__title">{{ post.title }} ?</h1>
        <p class="post-view__content__paragraph">{{ post.content }}.</p>
        <img
          class="post-view__content__image"
          :src="`https://picsum.photos/seed/${post.id}/600/400`"
          alt=""
        />

        <p class="post-view__content__paragraph">
          Lorem ipsum dolor sit amet. Qui nesciunt omnis sed quos optioest ipsum. In obcaecati sunt
          sit consectetur itaqueSed iste cum accusamus laborum quo obcaecati dolorum qui quibusdam
          distinctio! Aut laudantium amet ut consequatur earumin odit. Ab unde quaerat aut
          reprehenderit voluptatemet debitis! Vel corrupti temporibusEt odit quo odio vero? Non
          dolorem odit
          <em>Ut nostrum a totam voluptatum</em>. Ut vero amet ut minus errorEst nemo et voluptatum
          quidem.
        </p>
        <h2 class="post-view__content__title">
          Vel similique nulla sit quos perspiciatis aut odit suscipit!
        </h2>
        <p class="post-view__content__paragraph">
          Aut quae reprehenderit
          <strong>Et quod aut praesentium officia ut officia voluptatem</strong> sed minus dolorem
          33 iure iure! At veniam possimus a totam repudiandaequi reprehenderit eos deleniti odit?
          Ea porro laborum eos quis perspiciatisqui blanditiis aut atque eveniet ad labore esse. Qui
          dolorum esseEst corrupti ea consequatur quis 33 quod repellendus qui consectetur
          distinctio non adipisci animi ut ipsa impedit. Quo voluptate illo qui quis recusandaeRem
          voluptas. Sed error harum non maxime quodid alias sit obcaecati labore et numquam placeat.
          33 provident tempore ad dignissimos quia <em>Est quia vel nobis asperiores</em>. Et
          repellat animiQui similique non facere impedit eos reiciendis repellendus et provident
          galisum id aliquid provident. Sed voluptatem obcaecati ea adipisci illoVel tempore sit
          ipsum possimus eos aliquid molestiae.
        </p>
        <h3 class="post-view__content__title">Aut consequatur magnam non maiores adipisci.</h3>
        <p class="post-view__content__paragraph">
          Et possimus QuisNon molestiae aut perspiciatis fugit et exercitationem aspernatur. Qui
          eius impedit cum voluptas possimusrem nobis ut obcaecati suscipit est labore corrupti. Ut
          nulla asperioresAt aperiam qui dignissimos quidem id officiis sint ut similique nihil non
          officia voluptate aut voluptatem ducimus. Qui deserunt consequaturSed soluta ut numquam
          similique et voluptatibus labore sed obcaecati accusamus eos explicabo omnis. Ut enim
          atqueUt corporis ut sint voluptates in rerum veritatis. Aut repellendus doloremqueEst
          optio eos quam ipsum est quis molestiae et temporibus perspiciatis. Eum distinctio quis in
          suscipit alias
          <em>Vel dolor</em>.
        </p>
      </div>
      <PostViewAuthor :user="user" :author-posts="moreUserPosts" />
    </div>
    <PostViewComments :comments="comments" />
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/blog';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import Header from '../../components/HeaderComponent.vue';
import PostViewAuthor from './PostViewAuthor.vue';
import PostViewComments from './PostViewComments.vue';

//Router

const route = useRoute();
const routeId = ref<string>(route.params.id as string);

// Store
const store = useBlogStore();
const { fetchBlogData, fetchPostComments, getPostsFromUserById } = store;
const { posts, users, comments } = storeToRefs(store);

onMounted(async () => {
  await fetchBlogData();
  await fetchPostComments(routeId.value);
});

const post = posts.value.filter((post) => post.id === parseInt(routeId.value))[0];
const user = users.value.filter((user) => user.id === post.userId)[0];
const moreUserPosts = getPostsFromUserById(user.id, 4, post.id);
</script>
