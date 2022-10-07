import React, { useEffect, useState } from "react";

import PostList from "../components/post-list/PostList.component";
import { fetchPostList } from "../utils/backendConnections";

import "./Homepage.styles.scss";

function Homepage() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetchPostList(setPostList);
  }, []);

  return (
    <div className="homepage">
      <PostList list={postList} />
    </div>
  );
}

export default Homepage;
