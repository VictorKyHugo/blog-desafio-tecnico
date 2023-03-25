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
  phone: string;
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
  const currentPaginatePage = ref<number>(1);

  const fetchBlogData = async () => {
    return BlogService.fetchBlogData()
      .then((data) => {
        posts.value = data.posts;
        users.value = data.users;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const fetchPostComments = async (postId: number | string) => {
    return BlogService.fetchPostComments(postId)
      .then((data) => {
        comments.value = data.comments;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const getPostsFromUserById = (userId: number, quantity?: number, excludePostId?: number) => {
    let userPosts = [];

    userPosts = posts.value.filter((post) => post.userId === userId);

    if (excludePostId) {
      userPosts = userPosts.filter((post) => post.id !== excludePostId);
    }

    if (quantity) {
      // subtract 1 to match index
      userPosts = userPosts.slice(0, 4);
    }

    return userPosts;
  };

  const getPostsToRender = (itemsPerPage: number, currentPage: number) => {
    const pageFirstItemIndex = itemsPerPage * currentPage - itemsPerPage;
    const pageLastItemIndex = itemsPerPage * currentPage;

    return posts.value.slice(pageFirstItemIndex, pageLastItemIndex);
  };

  const getUserNameById = (id: number): string => {
    const [{ name }] = users.value.filter((user) => user.id === id);

    return name;
  };

  return {
    fetchBlogData,
    fetchPostComments,
    getPostsToRender,
    getUserNameById,
    getPostsFromUserById,
    posts,
    users,
    comments,
    currentPaginatePage
  };
});
