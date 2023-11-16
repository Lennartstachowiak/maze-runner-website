import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../atoms/Header";
import SelectItem from "../../molecules/Maze/SelectItem";
import { GenerateTypes } from "../../../types/maze";
import { KeyedMutator } from "swr";
import { generateNewMaze } from "../../../../modules/API";

interface GenerateMazeProps {
  mutate: KeyedMutator<unknown>;
}

const GenerateNewMaze = (props: GenerateMazeProps) => {
  const { mutate } = props;
  const [mazeName, setMazeName] = useState("");
  const [mazeSize, setMazeSize] = useState(30);
  const [generateType, setGenerateType] = useState<GenerateTypes>(
    "RecursiveBacktracking"
  );
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMazeName(event.target.value);
  };
  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMazeSize(parseInt(event.target.value));
  };
  const handleGenerateNewMaze = async () => {
    await generateNewMaze({ mazeName, mazeSize, generateType });
    await mutate();
  };
  const handleTypeChange = (event: SelectChangeEvent) => {
    setGenerateType(event.target.value as GenerateTypes);
  };
  const isMazeSizeCorrect = mazeSize <= 30 && mazeSize >= 4;
  return (
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
              sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="maze-size"
              type="number"
              label="Maze size:"
              value={mazeSize}
              onChange={handleChangeSize}
              sx={{
                width: 90,
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
              inputProps={{ min: 4, max: 30 }}
            />
            {!isMazeSizeCorrect && (
              <Typography variant="body1" color="error">
                Maze size has to be between 4 and 30!
              </Typography>
            )}
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="type-maze-generation-label">
                Algorithm type for maze generation:
              </InputLabel>
              <Select
                type="string"
                id="type-maze-generation"
                value={generateType}
                label="Algorithm type for maze generation:"
                onChange={handleTypeChange}
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
              >
                <MenuItem value={"RecursiveBacktracking"}>
                  <SelectItem
                    difficulty="Harder"
                    tagName="Recursive Backtracking"
                  />
                </MenuItem>
                <MenuItem value={"Sidewinder"}>
                  <SelectItem difficulty="Easier" tagName="Sidewinder" />
                </MenuItem>
              </Select>
            </FormControl>
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
  );
};

export default GenerateNewMaze;
