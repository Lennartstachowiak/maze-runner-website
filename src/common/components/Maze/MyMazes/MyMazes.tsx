import { Grid, Typography, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  deleteMaze,
  generateNewMaze,
  useGetMyMazes,
} from "../../../../modules/API";
import MazeSelection from "../../Homepage/components/MazeSelection";
import Header from "../../components/Header";
import { MazeProps } from "../../../types/maze";
import DeleteIcon from "@mui/icons-material/Delete";

export const MyMazes = () => {
  const { mazes, isLoading, isError, mutate } = useGetMyMazes();
  const [mazeName, setMazeName] = useState("");
  const [mazeSize, setMazeSize] = useState(0);
  const [selectedMaze, setMaze] = useState<MazeProps | null>(null);
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMazeName(event.target.value);
  };
  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMazeSize(parseInt(event.target.value));
  };
  const handleGenerateNewMaze = async () => {
    await generateNewMaze({ mazeName: mazeName, mazeSize: mazeSize });
    await mutate();
  };
  const handleDeleteMaze = async () => {
    if (selectedMaze) {
      await deleteMaze(selectedMaze!.id);
      setMaze(null);
      await mutate();
    }
  };
  const isMazeSizeCorrect = mazeSize == 0 || (mazeSize <= 30 && mazeSize >= 4);
  return (
    <Grid>
      <MazeSelection
        mazes={mazes}
        title="My Mazes"
        isLoading={isLoading}
        isError={isError}
        selectedMaze={selectedMaze}
        setMaze={setMaze}
      />
      {selectedMaze && (
        <Button variant="contained" color="error" onClick={handleDeleteMaze}>
          <DeleteIcon sx={{ marginRight: 1 }} />
          Delete selected maze
        </Button>
      )}
      {mazes?.length < 1 && (
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
      <Grid container direction="column" spacing={2} marginY={2}>
        <Header title="Generate a new maze" />
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
                sx={{ width: 90 }}
                inputProps={{ min: 4, max: 30 }}
              />
              {!isMazeSizeCorrect && (
                <Typography variant="body1" color="error">
                  Maze size has to be between 4 and 30!
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            disabled={!mazeName || !isMazeSizeCorrect}
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
