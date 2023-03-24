import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { fetchBlogData, fetchPostComments } from '../blog.service';
import axios from 'axios';

vi.mock('axios');

describe('Users Service', () => {
  beforeEach(() => {
    (axios.get as Mock).mockReset();
    (axios.all as Mock).mockResolvedValue([]);
  });

  it('should make two GET requests to fetch users and posts', async () => {
    fetchBlogData();
    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  it('should make a GET request to fetch post comments', async () => {
    const commentMock = [
      {
        body: 'body do comentário',
        email: 'email',
        id: 1,
        name: 'Júlia Matos',
        postId: '1'
      }
    ];

    (axios.get as Mock).mockResolvedValue({
      data: commentMock
    });

    const postId = 1;
    const users = await fetchPostComments(postId);

    expect(axios.get).toHaveBeenCalledWith(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );

    expect(users.comments).toStrictEqual(commentMock);
  });
});
