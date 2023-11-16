import React from "react";
import InfoBlock from "../organisms/Maze/InfoBlock";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useGetSingleMaze } from "../../../modules/API";
import MazeStructure from "../molecules/Maze/MazeStructure";
import Header from "../atoms/Header";
import { MazeProps } from "../../types/maze";

const OverviewPage = () => {
  const {
    maze,
    isLoading: isMazeLoading,
    isError: isMazeError,
  }: {
    maze: MazeProps;
    isLoading: boolean;
    isError: boolean;
  } = useGetSingleMaze("100");

  if (isMazeLoading) {
    return <CircularProgress />;
  }
  if (isMazeError) {
    <Typography variant="body1" color="red">
      Error
    </Typography>;
  }
  return (
    <Grid container>
      <Grid item paddingBottom={3} paddingLeft={2}>
        <Header title={"Overview"} />
      </Grid>
      <Grid container wrap="nowrap" spacing={5}>
        <Grid item xs={4.2}>
          <InfoBlock mazeSolution={null} maze={maze} />
        </Grid>
        <Grid item xs={7.8}>
          <MazeStructure maze={maze} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverviewPage;
