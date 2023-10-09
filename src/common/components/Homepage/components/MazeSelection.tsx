import { Button, Chip, Grid, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { MazeProps } from "./MazePreviewWrapper";
import Header from "../../components/Header";

interface MazeSelectionProps {
  mazes: MazeProps[];
  selectedMaze: MazeProps | null;
  setMaze: Dispatch<SetStateAction<MazeProps | null>>;
}

const MazeSelection = (props: MazeSelectionProps) => {
  const { mazes, selectedMaze, setMaze } = props;
  return (
    <Grid container direction="row" marginY={4}>
      <Header title="Select a maze" />
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
            <MazeItem
              id={maze.id}
              name={maze.name}
              difficulty={maze.difficulty}
              imgLink={maze.imgLink}
              selectedMaze={selectedMaze}
              structure={maze.structure}
              highscores={maze.highscores}
              setMaze={setMaze}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const MazeItem = ({
  id,
  name,
  difficulty,
  imgLink,
  selectedMaze,
  structure,
  highscores,
  setMaze,
}: {
  id: string;
  name: string;
  difficulty: string;
  selectedMaze: MazeProps | null;
  imgLink: string;
  structure: [][];
  highscores: [];
  setMaze: Dispatch<SetStateAction<MazeProps | null>>;
}) => {
  return (
    <Button
      onClick={() => {
        setMaze({
          id: id,
          name: name,
          imgLink: imgLink,
          difficulty: difficulty,
          structure: structure,
          highscores: highscores,
        });
      }}
      sx={{
        width: 275,
        color: (theme) => theme.palette.primary.dark,
        backgroundColor: (theme) =>
          id === selectedMaze?.id
            ? theme.palette.secondary.light
            : theme.palette.background.paper,
        borderRadius: 7,
      }}
    >
      <Grid container>
        <Grid item padding={1}>
          <Chip
            label={difficulty}
            sx={{
              color: (theme) => theme.palette.secondary.main,
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          />
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
        >
          <Grid item>
            <img
              width={165}
              height={165}
              title="Maze Example"
              src={"data:image/png;base64," + imgLink}
            />
          </Grid>
        </Grid>

        <Grid
          item
          textAlign="center"
          width="100%"
          sx={{
            borderRadius: 4,
            marginX: 1,
            marginY: 1,
            boxShadow: 0,
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Typography variant="h4" color="secondary.main" paddingY={1.5}>
            {name}
          </Typography>
        </Grid>
      </Grid>
    </Button>
  );
};

export default MazeSelection;
