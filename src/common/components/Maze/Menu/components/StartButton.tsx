import { Button, Typography, Grid } from "@mui/material";
import React from "react";

interface StartButtonProps {
  isDiabled: boolean;
  handleStart: () => void;
}

const StartButton = (props: StartButtonProps) => {
  const { isDiabled, handleStart } = props;

  return (
    <Grid container>
      <Button
        disabled={isDiabled}
        onClick={handleStart}
        sx={{
          height: 80,
          width: 200,
          opacity: isDiabled ? 0.5 : 1,
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 7,
        }}
      >
        <Typography variant="h4" color="secondary.main" paddingY={1.5}>
          Solve maze
        </Typography>
      </Button>
    </Grid>
  );
};

export default StartButton;
