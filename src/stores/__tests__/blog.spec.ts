import { setActivePinia, createPinia } from 'pinia';
import { useBlogStore } from '../blog';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import * as BlogService from '../../services/blog.service';

describe('Blog Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should receive UserId and return it's name", () => {
    const store = useBlogStore();
    const userId = 1;
    const userMock = [
      {
        id: 1,
        name: 'Flávio Ferreira',
        username: 'Flaferreira',
        email: 'flaferreira@getMaxListeners.com'
      }
    ];
    const spy = vi.spyOn(store, 'getUserNameById').mockImplementation((id) => {
      const [{ name }] = userMock.filter((user) => user.id === id);

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
});
