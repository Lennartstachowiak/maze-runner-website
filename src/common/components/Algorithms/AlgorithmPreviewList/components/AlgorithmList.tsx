import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import AlgorithmItem from "./AlgorithmItem";
import { AlgorithmInterface, AlgorithmList } from "../types";
import { useGetAlgorithms } from "../../../../../modules/API";

const AlgorithmList = (props: AlgorithmList) => {
  const { selectedAlgorithm, setAlgorithm, flexWrap } = props;
  const {
    algorithmList,
    isLoading,
    isError,
  }: {
    algorithmList: AlgorithmInterface[];
    isLoading: boolean;
    isError: boolean;
  } = useGetAlgorithms();
  if (isError) {
    return <>ERROR</>;
  }
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Grid
      container
      direction="row"
      paddingY={2}
      marginLeft={0}
      flexWrap={flexWrap}
      overflow="auto"
    >
      {algorithmList?.map((algorithm) => (
        <Grid
          item
          key={algorithm.id}
          paddingLeft={2}
          paddingBottom={flexWrap === "wrap" ? 2 : 0}
          sx={{
            transform: `scale(${
              algorithm.id === selectedAlgorithm?.id ? 1.1 : 1
            })`,
          }}
        >
          <AlgorithmItem
            id={algorithm.id}
            name={algorithm.name}
            setAlgorithm={setAlgorithm}
            selectedAlgorithm={selectedAlgorithm}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AlgorithmList;
