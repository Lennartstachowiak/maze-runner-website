import { Chip } from "@mui/material";
import React from "react";

interface DifficultyChipComponentProps {
  difficulty: string;
}

const DifficultyChip = (props: DifficultyChipComponentProps) => {
  const { difficulty } = props;
  return (
    <Chip
      label={difficulty}
      sx={{
        color: (theme) => theme.palette.secondary.main,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    />
  );
};

export default DifficultyChip;
