import { Button, Typography } from "@mui/material";
import React from "react";
import { TextButtonInterface } from "../../../types";

const TextButton = (props: TextButtonInterface) => {
  const { text, handleClick, isDiabled = false } = props;
  return (
    <Button
      disabled={isDiabled}
      variant="text"
      color="primary"
      onClick={handleClick}
    >
      <Typography
        variant="body1"
        paddingX={2}
        paddingY={1}
        borderRadius={3}
        sx={{
          color: (theme) => theme.palette.background.default,
          backgroundColor: (theme) => theme.palette.secondary.main,
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default TextButton;
