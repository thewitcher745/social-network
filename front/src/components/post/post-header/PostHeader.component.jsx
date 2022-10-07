import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

import { getPostHeaderTime } from "../../../utils/timeTools";

import "./PostHeader.styles.scss";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value + 1); // update state to force render
}

function PostHeader({ imageUrl, createdAt, name }) {
  const forceUpdate = useForceUpdate();
  setInterval(forceUpdate, 30000);

  const timePast = getPostHeaderTime(createdAt);
  return (
    <Box className="post-header">
      <Avatar src={imageUrl} className="avatar" />
      <Box className="header-title-container">
        <span className="header-name">{name}</span>
        <span className="header-date">{timePast}</span>
      </Box>
    </Box>
  );
}

export default PostHeader;
