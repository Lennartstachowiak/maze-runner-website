import { Button, Typography } from "@mui/material";
import React from "react";
import { AlgorithmBasic, AlgorithmInterface } from "../types";

const AlgorithmItem = (props: AlgorithmInterface & AlgorithmBasic) => {
  const { id, name, selectedAlgorithm, setAlgorithm } = props;
  return (
    <Button
      onClick={() => {
        setAlgorithm({
          id: id,
          name: name,
        });
      }}
      sx={{
        height: "100%",
        width: 200,
        color: (theme) => theme.palette.primary.dark,
        backgroundColor: (theme) =>
          id === selectedAlgorithm?.id
            ? theme.palette.secondary.light
            : theme.palette.background.paper,
        borderRadius: 7,
      }}
    >
      <Typography variant="h4" color="secondary.main" paddingY={1.5}>
        {name}
      </Typography>
    </Button>
  );
};

export default AlgorithmItem;
