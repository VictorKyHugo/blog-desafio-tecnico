<template>
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
        <strong>Et quod aut praesentium officia ut officia voluptatem</strong> sed minus dolorem 33
        iure iure! At veniam possimus a totam repudiandaequi reprehenderit eos deleniti odit? Ea
        porro laborum eos quis perspiciatisqui blanditiis aut atque eveniet ad labore esse. Qui
        dolorum esseEst corrupti ea consequatur quis 33 quod repellendus qui consectetur distinctio
        non adipisci animi ut ipsa impedit. Quo voluptate illo qui quis recusandaeRem voluptas. Sed
        error harum non maxime quodid alias sit obcaecati labore et numquam placeat. 33 provident
        tempore ad dignissimos quia <em>Est quia vel nobis asperiores</em>. Et repellat animiQui
        similique non facere impedit eos reiciendis repellendus et provident galisum id aliquid
        provident. Sed voluptatem obcaecati ea adipisci illoVel tempore sit ipsum possimus eos
        aliquid molestiae.
      </p>
      <h3 class="post-view__content__title">Aut consequatur magnam non maiores adipisci.</h3>
      <p class="post-view__content__paragraph">
        Et possimus QuisNon molestiae aut perspiciatis fugit et exercitationem aspernatur. Qui eius
        impedit cum voluptas possimusrem nobis ut obcaecati suscipit est labore corrupti. Ut nulla
        asperioresAt aperiam qui dignissimos quidem id officiis sint ut similique nihil non officia
        voluptate aut voluptatem ducimus. Qui deserunt consequaturSed soluta ut numquam similique et
        voluptatibus labore sed obcaecati accusamus eos explicabo omnis. Ut enim atqueUt corporis ut
        sint voluptates in rerum veritatis. Aut repellendus doloremqueEst optio eos quam ipsum est
        quis molestiae et temporibus perspiciatis. Eum distinctio quis in suscipit alias
        <em>Vel dolor</em>.
      </p>
    </div>
    <section class="post-view__author">
      <img
        class="post-view__author__picture"
        :src="`https://randomuser.me/api/portraits/women/${user.id}.jpg`"
      />
      <h3 class="post-view__author__name">{{ user.name }}</h3>
      <span class="post-view__author__phone">{{ user.phone }}</span>
      <p class="post-view__author__description">
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas.
      </p>
      <div class="post-view__author__more-posts">
        <h2 class="post-view__author__more-posts__title">Posts Relacionados</h2>
        <Card
          class="post-view__author__more-posts__post"
          author="Victor Hugo"
          :post-id="1"
          :author-id="1"
          :is-compact="true"
          v-for="ai in 3"
          :key="ai"
        >
          <template #title>
            sunt aut facere repellat provident occaecati excepturi optio reprehenderit
          </template>
          <template #content>
            quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit
            molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto.
          </template>
        </Card>
      </div>
    </section>
  </div>
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
import { ref } from 'vue';
import { useBlogStore } from '@/stores/blog';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';

import Header from '../components/HeaderComponent.vue';
import Card from '../components/CardComponent.vue';

//Router

const route = useRoute();
const router = useRouter();

// Store
const store = useBlogStore();
const { fetchBlogData, fetchPostComments } = store;
const { posts, users, comments } = storeToRefs(store);

const routeId: string = route.params.id as string;

await fetchBlogData();
await fetchPostComments(routeId);

const post = posts.value.filter((post) => post.id === parseInt(routeId))[0];
const user = users.value.filter((user) => user.id === post.userId)[0];
</script>
