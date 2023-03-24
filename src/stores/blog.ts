import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as BlogService from '@/services/blog.service';

interface IPosts {
  id: number;
  userId: number;
  title: string;
  content: string;
}

interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface IPostComments {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<IPosts[]>([]);
  const users = ref<IUsers[]>([]);
  const comments = ref<IPostComments[]>([]);

  const getUserNameById = (id: number): string => {
    const [{ name }] = users.value.filter((user) => user.id === id);

    return name;
  };

  function fetchBlogData(): void {
    BlogService.fetchBlogData()
      .then((data) => {
        posts.value = data.posts;
        users.value = data.users;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function fetchPostComments(postId: number): void {
    BlogService.fetchPostComments(postId)
      .then((data) => {
        comments.value = data.comments;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  return { fetchBlogData, fetchPostComments, getUserNameById, posts, users, comments };
});
