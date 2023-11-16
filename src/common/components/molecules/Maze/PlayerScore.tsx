import { Grid, Typography } from "@mui/material";
import React from "react";
import { PlayerProps } from "../../../types/Maze/previewTypes";

const PlayerScore = ({ player }: { player: PlayerProps }) => {
  return (
    <Grid container spacing={0} direction="column" py={1}>
      <Grid item>
        <Typography
          variant="body1"
          color="secondary.main"
          flexWrap="nowrap"
          whiteSpace="nowrap"
        >
          {player.name}
        </Typography>
      </Grid>
      <Grid item>
        <Grid item>
          <Typography
            variant="body1"
            color="secondary.main"
            flexWrap="nowrap"
            whiteSpace="nowrap"
          >
            {player.algorithm_name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            color="secondary.main"
            flexWrap="nowrap"
            whiteSpace="nowrap"
          >
            Score: {player.score}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlayerScore;
