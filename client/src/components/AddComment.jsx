import React, { useState } from "react";
import {
  SendOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, InputBase, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const AddComment = ({
  postId,
}) => {
  const [comment, setComment] = useState(""); // New state for the comment input
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);


  const { palette } = useTheme();


  const addComment = async () => {
    const formData = new FormData();
    formData.append("comment", comment);
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, comment }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment(""); // Clear the comment input after adding
  };

  return (
    <WidgetWrapper m="2rem 0">
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
        </FlexBetween>
      </FlexBetween>
      {
        <Box mt="0.5rem">
          <FlexBetween gap="1.5rem" mt="0.5rem">
            <InputBase
              placeholder="Add new comment..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "1rem 2rem",
              }}
            />
            <IconButton onClick={addComment}>
              <SendOutlined />
            </IconButton>
          </FlexBetween>
        </Box>
      }
    </WidgetWrapper>
  );
};

export default AddComment;
