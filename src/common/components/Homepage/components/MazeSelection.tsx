import { Grid, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import { MazeItem, MazeItemButton } from "./MazeItem";
import { MazeSelectionProps } from "../../../types/maze";
import LoadingDialog from "../../components/LoadingDialog";

const MazeSelection = (props: MazeSelectionProps) => {
  const {
    mazes,
    selectedMaze = null,
    setMaze,
    title,
    isLoading,
    isError,
  } = props;
  if (isLoading) {
    return <LoadingDialog loading={isLoading} />;
  }
  if (isError) {
    return (
      <Typography variant="body1" color="initial">
        Error
      </Typography>
    );
  }
  return (
    <Grid container direction="row" marginY={2}>
      {title && <Header title={title} />}
      <Grid
        container
        direction="row"
        marginTop={2}
        paddingY={2}
        columnSpacing={5}
        flexWrap="nowrap"
        overflow="auto"
      >
        {mazes?.map((maze) => (
          <Grid
            item
            key={maze.id}
            sx={{
              transform: `scale(${maze.id === selectedMaze?.id ? 1.1 : 1})`,
            }}
          >
            {setMaze ? (
              <MazeItemButton
                maze={maze}
                selectedMaze={selectedMaze}
                setMaze={setMaze}
              />
            ) : (
              <MazeItem maze={maze} />
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default MazeSelection;
