import React from "react";
import { Stack, Skeleton, useMediaQuery } from "@mui/material";

import Post from "../post/Post.component";

import "./PostList.styles.scss";

function PostList({ list }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const postListStyles = {
    width: isSmallScreen ? "95%" : "50%",
  };

  const postListElement = list.map((post, idx) => (
    <Post
      key={idx}
      post={{
        body: post.body,
        name: post.postedBy.name,
        createdAt: post.createdAt,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOCaDIv4ldcuY39la4AfIGj-5pdGyKsiyiFuia3EnZ&s",
      }}
    />
  ));

  return (
    <Stack style={postListStyles} spacing={2}>
      {list.length > 0 ? (
        postListElement
      ) : (
        <>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ height: "12rem", backgroundColor: "#333333" }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ height: "12rem", backgroundColor: "#333333" }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ height: "12rem", backgroundColor: "#333333" }}
          />
        </>
      )}
    </Stack>
  );
}

export default PostList;
