import React from "react";
import AlgorithmList from "./AlgorithmList";
import { AlgorithmListInterface } from "../../../types/Algorithm/types";

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
      isVertical={true}
      selectedAlgorithm={selectedAlgorithm}
      setAlgorithm={setAlgorithm}
      algorithmList={algorithmList}
      handelAddAlgorithm={handelAddAlgorithm}
    />
  );
};

const AlgorithmListHorizontal = (props: AlgorithmListInterface) => {
  const { title, selectedAlgorithm, setAlgorithm, algorithmList } = props;
  return (
    <AlgorithmList
      title={title}
      isVertical={false}
      selectedAlgorithm={selectedAlgorithm}
      setAlgorithm={setAlgorithm}
      algorithmList={algorithmList}
    />
  );
};

export { AlgorithmListVertical, AlgorithmListHorizontal };
