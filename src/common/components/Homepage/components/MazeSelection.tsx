import { Grid } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import { MazeItem, MazeItemButton } from "./MazeItem";
import { MazeSelectionProps } from "../../../types/maze";

const MazeSelection = (props: MazeSelectionProps) => {
  const { mazes, selectedMaze = null, setMaze, title } = props;
  return (
    <Grid container direction="row" marginY={4}>
      <Header title={title} />
      <Grid
        container
        direction="row"
        marginTop={2}
        paddingY={4}
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
