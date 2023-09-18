import React from "react";
import AlgorithmList from "./components/AlgorithmList";
import { AlgorithmListInterface } from "./types";

const AlgorithmListVertical = (props: AlgorithmListInterface) => {
  const { title, selectedAlgorithm, setAlgorithm } = props;
  return (
    <AlgorithmList
      title={title}
      flexWrap="wrap"
      selectedAlgorithm={selectedAlgorithm}
      setAlgorithm={setAlgorithm}
    />
  );
};

const AlgorithmListHorizontal = (props: AlgorithmListInterface) => {
  const { title, selectedAlgorithm, setAlgorithm } = props;
  return (
    <AlgorithmList
      title={title}
      flexWrap="nowrap"
      selectedAlgorithm={selectedAlgorithm}
      setAlgorithm={setAlgorithm}
    />
  );
};

export { AlgorithmListVertical, AlgorithmListHorizontal };
