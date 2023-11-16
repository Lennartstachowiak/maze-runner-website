import { Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { MazeProps } from "../../../types/maze";

interface MazeItem {
  maze: MazeProps;
  focus?: boolean;
}

const MazeItem = (props: MazeItem) => {
  const { maze, focus } = props;
  return (
    <Grid
      container
      sx={{
        padding: 1,
        color: (theme) => theme.palette.primary.dark,
        backgroundColor: (theme) =>
          focus
            ? theme.palette.secondary.light
            : theme.palette.background.paper,
        borderRadius: 7,
        width: 280,
      }}
    >
      <Grid item padding={1}>
        <Chip
          label={maze.difficulty}
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
            title="Maze Image"
            src={"data:image/png;base64," + maze.imgLink}
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
          {maze.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export { MazeItem };
