import { Grid, Typography, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { generateNewAlgorithm, useGetMyMazes } from "../../../../modules/API";
import LoadingDialog from "../../components/LoadingDialog";
import MazeSelection from "../../Homepage/components/MazeSelection";

export const MyMazes = () => {
  const { mazes, isLoading, isError } = useGetMyMazes();
  const [mazeName, setMazeName] = useState("");
  const [mazeSize, setMazeSize] = useState(0);
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
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMazeName(event.target.value);
  };
  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMazeSize(parseInt(event.target.value));
  };
  const handleGenerateNewMaze = () => {
    generateNewAlgorithm({ mazeName: mazeName, mazeSize: mazeSize });
  };
  return (
    <Grid>
      <MazeSelection mazes={mazes} title="My Mazes" />
      {mazes.length < 1 && (
        <Grid
          container
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" color="initial">
              No mazes.
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                id="maze-name"
                label="Maze Name:"
                value={mazeName}
                onChange={handleChangeName}
              />
            </Grid>
            <Grid item>
              <TextField
                id="maze-size"
                type="number"
                label="Maze size:"
                value={mazeSize}
                onChange={handleChangeSize}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Button
            disabled={!mazeName || !mazeSize}
            variant="contained"
            color="secondary"
            onClick={handleGenerateNewMaze}
          >
            Generate new maze
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
