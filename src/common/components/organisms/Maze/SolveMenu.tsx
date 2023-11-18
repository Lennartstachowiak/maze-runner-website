import { Grid } from "@mui/material";
import React from "react";
import Score from "../../molecules/Maze/Score";
import { ScoreType } from "../../pages/MazePage";
import FancyTextButton from "../../atoms/Button/FancyTextButton";

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
      wrap="wrap-reverse"
      spacing={2}
    >
      <Grid item md={7} xs={12}>
        <Score isDisabled={isDiabled} score={score} />
      </Grid>
      <Grid item>
        <FancyTextButton
          isDiabled={isDiabled}
          handleClick={handleStart}
          text={"Solve maze"}
        />
      </Grid>
    </Grid>
  );
};

export default Menu;
