import axios from "axios";
import { sample } from "underscore";

export async function fetchPostList(setPostList) {
  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNmNmZhZjgzMjliZWJhNjY1MmJjNmEiLCJpYXQiOjE2NjUxMDE4MDR9.yUQielhZj25u2bmYUS27bwDBmkFnYPiIoGJKwxkseuo",
      "content-type": "text/json",
    },
  };

  const posts = await axios.get("http://localhost:3000/getAllPosts", config);
  const rawPostList = posts.data.posts;

  // Promise.all resolves when all the promises in the input iterable are resolved
  const postList = await Promise.all(
    rawPostList.map(async (post) => {
      const postedByUser = await axios.get(
        `http://localhost:3000/user/${post.postedBy}`,
        config
      );
      const randomBody = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return {
        ...post,
        postedBy: postedByUser.data,
        body: randomBody.data[sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])].body,
      };
    })
  );

  setPostList(postList);
}
