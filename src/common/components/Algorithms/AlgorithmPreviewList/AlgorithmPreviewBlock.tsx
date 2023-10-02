import React from "react";
import AlgorithmList from "./components/AlgorithmList";
import { AlgorithmListInterface } from "./types";

const AlgorithmListVertical = (props: AlgorithmListInterface) => {
  const {
    title,
    selectedAlgorithm,
    setAlgorithm,
    algorithmList,
    handelAddAlgorithm,
  } = props;
  return (
    <AlgorithmList
      title={title}
      flexWrap="wrap"
      selectedAlgorithm={selectedAlgorithm}
      setAlgorithm={setAlgorithm}
      algorithmList={algorithmList}
      handelAddAlgorithm={handelAddAlgorithm}
    />
  );
};

const AlgorithmListHorizontal = (props: AlgorithmListInterface) => {
  const {
    title,
    selectedAlgorithm,
    setAlgorithm,
    algorithmList,
    handelAddAlgorithm,
  } = props;
  return (
    <AlgorithmList
      title={title}
      flexWrap="nowrap"
      selectedAlgorithm={selectedAlgorithm}
      setAlgorithm={setAlgorithm}
      algorithmList={algorithmList}
      handelAddAlgorithm={handelAddAlgorithm}
    />
  );
};

export { AlgorithmListVertical, AlgorithmListHorizontal };
