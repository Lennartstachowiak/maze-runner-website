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
  console.log(selectedAlgorithm);
  return (
    <Grid container>
      <Grid item xs={5.2}>
        <AlgorithmListVertical
          title="My Algorithms"
          selectedAlgorithm={selectedAlgorithm}
          setAlgorithm={setAlgorithm}
        />
      </Grid>
      <Grid item xs={6.8}>
        <CodeBlockComponent
          initCode={selectedAlgorithm?.code}
          showLineNumbers={true}
          header={selectedAlgorithm ? selectedAlgorithm?.name : ""}
        />
      </Grid>
    </Grid>
  );
};

export default MyAlgorithms;
