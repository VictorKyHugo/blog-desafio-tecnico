import { setActivePinia, createPinia } from 'pinia';
import { useBlogStore } from '../blog';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import * as BlogService from '../../services/blog.service';

const postsMock = [
  {
    id: 1,
    userId: 1,
    title: 'Title',
    content: 'Content'
  },
  {
    id: 2,
    userId: 2,
    title: 'Title',
    content: 'Content'
  },
  {
    id: 3,
    userId: 1,
    title: 'Title',
    content: 'Content'
  },
  {
    id: 4,
    userId: 2,
    title: 'Title',
    content: 'Content'
  }
];

const usersMock = [
  {
    id: 1,
    name: 'Flávio Ferreira',
    username: 'Flaferreira',
    email: 'flaferreira@getMaxListeners.com'
  },
  {
    id: 2,
    name: 'Luiz Silva',
    username: 'Luizin',
    email: 'luluzin@getMaxListeners.com'
  }
];

describe('Blog Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should receive UserId and return it's name", () => {
    const store = useBlogStore();
    const userId = 1;

    const spy = vi.spyOn(store, 'getUserNameById').mockImplementation((id) => {
      const [{ name }] = usersMock.filter((user) => user.id === id);

      return name;
    });
    store.getUserNameById(userId);

    expect(spy).toHaveReturnedWith('Flávio Ferreira');
  });

  it('should call fetchBlogData from blogService', () => {
    const store = useBlogStore();
    const fetchBlogDataSpy = vi.spyOn(BlogService, 'fetchBlogData');

    store.fetchBlogData();

    expect(fetchBlogDataSpy).toHaveBeenCalled();
  });

  it('should call fetchPostComments from blogService', () => {
    const store = useBlogStore();
    const fetchPostCommentsSpy = vi.spyOn(BlogService, 'fetchPostComments');
    const postId = 1;

    store.fetchPostComments(postId);

    expect(fetchPostCommentsSpy).toHaveBeenCalled();
  });

  it('should get a quantity of post to render, according to currentPage and return the posts', async () => {
    const store = useBlogStore();

    const spy = vi.spyOn(store, 'getPostsToRender');
    spy.mockClear();

    const itemsPerPage = 2;
    const currentPage = 2;

    store.posts = postsMock;
    store.getPostsToRender(itemsPerPage, currentPage);

    expect(spy).toMatchSnapshot();
  });

  it('should get all posts from user', async () => {
    const store = useBlogStore();

    const spy = vi.spyOn(store, 'getPostsFromUserById');
    spy.mockClear();

    const userId = 2;

    store.posts = postsMock;
    store.getPostsFromUserById(userId);

    expect(spy).toMatchSnapshot();
  });

  it('should get 1 post from user', async () => {
    const store = useBlogStore();

    const spy = vi.spyOn(store, 'getPostsFromUserById');

    const userId = 2;

    store.posts = postsMock;
    const quantity = 1;
    store.getPostsFromUserById(userId, quantity);

    expect(spy).toMatchSnapshot();
  });

  it("should get 1 post excluding the first one by it's id", async () => {
    const store = useBlogStore();

    const spy = vi.spyOn(store, 'getPostsFromUserById');

    const userId = 1;

    store.posts = postsMock;
    const quantity = 1;
    const postIdToExclude = 1;
    store.getPostsFromUserById(userId, quantity, postIdToExclude);

    expect(spy).toMatchSnapshot();
  });
});
