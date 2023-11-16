import { Grid } from "@mui/material";
import React from "react";
import StartButton from "../../molecules/Maze/StartButton";
import Score from "../../molecules/Maze/Score";
import { ScoreType } from "../../pages/MazePage";

interface MenuProps {
  isDiabled: boolean;
  handleStart: () => Promise<void>;
  score: ScoreType;
}

const Menu = (props: MenuProps) => {
  const { isDiabled, handleStart, score } = props;

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      wrap="nowrap"
    >
      <Grid item>
        <Score isDisabled={isDiabled} score={score} />
      </Grid>
      <Grid item>
        <StartButton isDiabled={isDiabled} handleStart={handleStart} />
      </Grid>
    </Grid>
  );
};

export default Menu;
