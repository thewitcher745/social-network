import React from "react";
import Box from "@mui/material/Box";

import PostHeader from "./post-header/PostHeader.component";

import "./Post.styles.scss";

function Post({ post: { imageUrl, name, body, createdAt } }) {
  return (
    <Box
      sx={{
        backgroundColor: "#252525",
        borderRadius: "0.5rem",
        border: "1px solid #606060",
      }}
    >
      <PostHeader imageUrl={imageUrl} name={name} createdAt={createdAt} />
      <Box className="post-body">{body}</Box>
    </Box>
  );
}

export default Post;
