import { Grid, Typography } from "@mui/material";
import React from "react";
import DifficultyChip from "../../../components/DifficultyChip";

interface SelectItemProps {
  difficulty: string;
  tagName: string;
}

const SelectItem = (props: SelectItemProps) => {
  const { difficulty, tagName } = props;
  return (
    <Grid
      container
      flexWrap="nowrap"
      alignItems="center"
      direction="row"
      columnGap={1}
    >
      <Grid item>
        <DifficultyChip difficulty={difficulty} />
      </Grid>
      <Grid>
        <Typography variant="body1" color="initial" noWrap>
          {tagName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SelectItem;
