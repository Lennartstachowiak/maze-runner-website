import { Chip, Grid, Typography } from "@mui/material";
import React from "react";

interface MazeDescriptionComponentProps {
  name: string;
  difficulty: string;
}

const MazeDescription = (props: MazeDescriptionComponentProps) => {
  const { name, difficulty } = props;
  return (
    <Grid container paddingBottom={3} marginTop={1} wrap="nowrap">
      <Typography variant="h3" color="secondary.main" paddingRight={3}>
        {name}
      </Typography>
      <Chip
        label={difficulty}
        sx={{
          color: (theme) => theme.palette.secondary.main,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      />
    </Grid>
  );
};

export default MazeDescription;
