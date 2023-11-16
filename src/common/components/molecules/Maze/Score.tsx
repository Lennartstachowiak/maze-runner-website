import React from "react";
import { Grid, Typography } from "@mui/material";
import { ScoreType } from "../../pages/MazePage";

interface ScoreProps {
  isDisabled: boolean;
  score: ScoreType;
}

const Score = (props: ScoreProps) => {
  const { isDisabled, score } = props;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography
          variant="h4"
          padding={3}
          textAlign="center"
          sx={{
            height: 80,
            width: 200,
            opacity: !isDisabled ? 1 : 0.5,
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 7,
          }}
        >
          {score.steps} steps
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h4"
          padding={3}
          textAlign="center"
          sx={{
            height: 80,
            width: 200,
            opacity: !isDisabled ? 1 : 0.5,
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 7,
          }}
        >
          {score.visitedSteps} search
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h4"
          padding={3}
          textAlign="center"
          sx={{
            height: 80,
            width: 200,
            opacity: !isDisabled ? 1 : 0.5,
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 7,
          }}
        >
          {score.score} score
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Score;
