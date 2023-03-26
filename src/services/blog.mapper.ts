interface IPostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IUserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IPostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const mapBlog = ({ users, posts }: { users: Array<IUserData>; posts: Array<IPostData> }) => {
  return {
    posts: posts.map(({ id, userId, title, body }) => ({
      id,
      userId,
      title,
      content: body
    })),
    users: users.map(({ id, name, username, email, phone }) => ({
      id,
      name,
      username,
      email,
      phone
    }))
  };
};

export const mapPostComments = (comments: Array<IPostComment>) => {
  return {
    comments: comments.map(({ body, email, id, name, postId }) => ({
      id,
      postId,
      name,
      email,
      body
    }))
  };
};
