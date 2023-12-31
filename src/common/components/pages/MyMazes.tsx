import { Grid, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { deleteMaze, useGetMyMazes } from "../../../modules/API";
import MazeSelection from "../template/Maze/MazeSelection";
import { MazeProps } from "../../types/maze";
import DeleteIcon from "@mui/icons-material/Delete";
import GenerateNewMaze from "../organisms/Maze/GenerateNewMaze";

const MyMazes = () => {
  const { mazes, isLoading, isError, mutate } = useGetMyMazes();

  const [selectedMaze, setMaze] = useState<MazeProps | null>(null);

  const handleDeleteMaze = async () => {
    if (selectedMaze) {
      await deleteMaze(selectedMaze!.id);
      setMaze(null);
      await mutate();
    }
  };
  return (
    <Grid container>
      <Grid item padding={3} width={"100%"}>
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
      </Grid>

      <GenerateNewMaze mutate={mutate} />
    </Grid>
  );
};

export default MyMazes;
