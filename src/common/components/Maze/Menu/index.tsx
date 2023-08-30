import { Grid } from "@mui/material";
import React from "react";
import StartButton from "./components/StartButton";
import Score from "./components/Score";
import { ScoreType } from "..";

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
