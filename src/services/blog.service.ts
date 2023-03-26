import axios from 'axios';
import { mapBlog, mapPostComments } from './blog.mapper';

const initialRoutes = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts/'
];

export const fetchBlogData = () =>
  axios.all(initialRoutes.map((promise) => axios.get(promise))).then(
    axios.spread((users, posts) => {
      const usersData = users.data;
      const postsData = posts.data;

      return mapBlog({ users: usersData, posts: postsData });
    })
  );

export const fetchPostComments = (postId: number | string) =>
  axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => mapPostComments(response.data));
