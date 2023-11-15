import { Grid, Typography } from "@mui/material";
import React from "react";
import DifficultyChip from "../../../components/DifficultyChip";

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
      <DifficultyChip difficulty={difficulty} />
    </Grid>
  );
};

export default MazeDescription;
