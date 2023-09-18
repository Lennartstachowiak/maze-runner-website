import React from "react";
import AlgorithmList from "./components/AlgorithmList";
import { AlgorithmBasic } from "./types";

const AlgorithmListVertical = (props: AlgorithmBasic) => {
  const { selectedAlgorithm, setAlgorithm } = props;
  return (
    <AlgorithmList
      flexWrap="wrap"
      selectedAlgorithm={selectedAlgorithm}
      setAlgorithm={setAlgorithm}
    />
  );
};

const AlgorithmListHorizontal = (props: AlgorithmBasic) => {
  const { selectedAlgorithm, setAlgorithm } = props;
  return (
    <AlgorithmList
      flexWrap="nowrap"
      selectedAlgorithm={selectedAlgorithm}
      setAlgorithm={setAlgorithm}
    />
  );
};

export { AlgorithmListVertical, AlgorithmListHorizontal };
