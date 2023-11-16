import { Button, Typography, Grid } from "@mui/material";
import React from "react";
import { TextButtonInterface } from "../../../types";

const FancyTextButton = (props: TextButtonInterface) => {
  const { text, isDiabled, handleClick } = props;

  return (
    <Grid container>
      <Button
        disabled={isDiabled}
        onClick={handleClick}
        sx={{
          height: 80,
          width: 200,
          opacity: isDiabled ? 0.5 : 1,
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 7,
        }}
      >
        <Typography variant="h4" color="secondary.main" paddingY={1.5}>
          {text}
        </Typography>
      </Button>
    </Grid>
  );
};

export default FancyTextButton;
