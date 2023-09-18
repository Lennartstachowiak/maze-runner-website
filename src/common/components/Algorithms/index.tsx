import { useState } from "react";
import React from "react";
import { AlgorithmListVertical } from "./AlgorithmPreviewList/AlgorithmPreviewBlock";
import { AlgorithmInterface } from "./AlgorithmPreviewList/types";

const MyAlgorithms = () => {
  const [selectedAlgorithm, setAlgorithm] = useState<AlgorithmInterface | null>(
    null
  );
  return (
    <AlgorithmListVertical
      selectedAlgorithm={selectedAlgorithm}
      setAlgorithm={setAlgorithm}
    />
  );
};

export default MyAlgorithms;
