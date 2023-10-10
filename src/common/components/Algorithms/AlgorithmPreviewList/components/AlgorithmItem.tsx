import { Button, Typography } from "@mui/material";
import React from "react";
import { AlgorithmState, AlgorithmInterface } from "../types";

const AlgorithmItem = (props: AlgorithmInterface & AlgorithmState) => {
  const {
    id,
    disabled = false,
    name,
    code,
    selectedAlgorithm,
    setAlgorithm,
  } = props;
  return (
    <Button
      disabled={disabled}
      onClick={() => {
        setAlgorithm({
          id: id,
          name: name,
          code: code,
        });
      }}
      sx={{
        height: "100%",
        width: 200,
        color: (theme) => theme.palette.primary.dark,
        backgroundColor: (theme) =>
          disabled
            ? theme.palette.background.paper
            : id === selectedAlgorithm?.id
            ? theme.palette.secondary.light
            : theme.palette.background.paper,
        borderRadius: 7,
      }}
    >
      <Typography
        variant="h4"
        color={disabled ? "lightgrey" : "secondary.main"}
        paddingY={1.5}
      >
        {name}
      </Typography>
    </Button>
  );
};

export default AlgorithmItem;
