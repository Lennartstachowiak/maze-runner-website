import { Grid } from "@mui/material";
import React from "react";
import MazeDescription from "./components/MazeDescription";
import MazeHighscore from "./components/MazeHighscore";
import GameComponent from "./components/MazeRender";
import { MazeSolution } from "..";
interface MazePreviewBlockComponentProps {
  name: string;
  difficulty: string;
  highscores: [];
  imgLink: string;
  mazeStructure: [][];
  mazeSolution?: MazeSolution | null;
}

const MazePreviewBlock = (props: MazePreviewBlockComponentProps) => {
  const { name, difficulty, highscores, imgLink, mazeStructure, mazeSolution } =
    props;
  return (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      padding={3}
      sx={{
        borderRadius: 7,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Grid item xs={4}>
        <MazeDescription name={name} difficulty={difficulty} />
        <MazeHighscore highscores={highscores} />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={7} padding={2}>
        {mazeStructure && mazeSolution ? (
          <GameComponent
            mazeStructure={mazeStructure}
            mazeSolution={mazeSolution}
          />
        ) : (
          <img
            width="100%"
            title="Maze Example"
            src={"data:image/png;base64," + imgLink}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default MazePreviewBlock;
