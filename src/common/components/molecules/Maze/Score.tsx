import React from "react";
import { Grid, Typography } from "@mui/material";
import { ScoreType } from "../../pages/MazePage";

interface ScoreProps {
  isDisabled: boolean;
  score: ScoreType;
}

const Score = (props: ScoreProps) => {
  const { isDisabled, score } = props;
  const minWidth = 170;
  return (
    <Grid container spacing={2} wrap="wrap">
      <Grid item xs={12} sm={4} minWidth={minWidth}>
        <Typography
          variant="h4"
          padding={3}
          textAlign="center"
          sx={{
            opacity: !isDisabled ? 1 : 0.5,
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 7,
          }}
        >
          {score.steps} steps
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} minWidth={minWidth}>
        <Typography
          variant="h4"
          padding={3}
          textAlign="center"
          sx={{
            opacity: !isDisabled ? 1 : 0.5,
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 7,
          }}
        >
          {score.visitedSteps} search
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} minWidth={minWidth}>
        <Typography
          variant="h4"
          padding={3}
          textAlign="center"
          sx={{
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
