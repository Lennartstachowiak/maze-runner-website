import { Grid } from "@mui/material";
import React from "react";
import MazeDescription from "../../molecules/Maze/MazeDescription";
import MazeHighscore from "../../molecules/Maze/MazeHighscore";
import MazeRender from "../../molecules/Maze/MazeRender";
import { MazeSolution } from "../../pages/MazePage";
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
      wrap="wrap"
      paddingY={3}
      paddingX={5}
      sx={{
        borderRadius: 7,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Grid item xs={12} sm={6}>
        <MazeDescription name={name} difficulty={difficulty} />
        <MazeHighscore highscores={highscores} />
      </Grid>
      <Grid item xs={12} sm={6} padding={4} minWidth={200}>
        {mazeStructure && mazeSolution ? (
          <MazeRender
            mazeStructure={mazeStructure}
            mazeSolution={mazeSolution}
          />
        ) : (
          <img
            width="100%"
            style={{ minWidth: 180 }}
            title="Maze Example"
            alt="Maze Example"
            src={"data:image/png;base64," + imgLink}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default MazePreviewBlock;
