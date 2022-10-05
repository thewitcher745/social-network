import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Post({ post, removePost }) {
  const { _id, title, body } = post;
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        width: "500px",
        margin: "2rem",
      }}
    >
      <h2>{title}</h2>
      <p>{body}</p>
      <button onClick={() => removePost(_id)}>X</button>
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000").then((response) => {
      setPosts(response.data.posts);
    });
  }, []);

  const removePost = (_id) => {
    axios.post("http://127.0.0.1:3000/removePost", { _id: _id }).then(() => {
      axios.get("http://127.0.0.1:3000").then((response) => {
        setPosts(response.data.posts);
      });
    });
  };

  return (
    <div className="App">
      {posts.map((post) => (
        <Post removePost={removePost} key={post.id} post={post} />
      ))}
    </div>
  );
}

export default App;
