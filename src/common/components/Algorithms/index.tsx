import { useState } from "react";
import React from "react";
import { AlgorithmListVertical } from "./AlgorithmPreviewList/AlgorithmPreviewBlock";
import { AlgorithmInterface } from "./AlgorithmPreviewList/types";
import Grid from "@mui/material/Grid";
import CodeBlockComponent from "./AlgorithmCodeBlock.tsx";

const MyAlgorithms = () => {
  const [selectedAlgorithm, setAlgorithm] = useState<AlgorithmInterface | null>(
    null
  );
  return (
    <Grid container>
      <Grid item xs={3}>
        <AlgorithmListVertical
          title="My Algorithms"
          selectedAlgorithm={selectedAlgorithm}
          setAlgorithm={setAlgorithm}
        />
      </Grid>
      <Grid item xs={9}>
        <CodeBlockComponent
          algorithm={selectedAlgorithm}
          showLineNumbers={true}
        />
      </Grid>
    </Grid>
  );
};

export default MyAlgorithms;
