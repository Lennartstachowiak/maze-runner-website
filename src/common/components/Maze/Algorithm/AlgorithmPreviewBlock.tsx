import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import { useGetAlgorithms } from "../../../../modules/API";

export interface AlgorithmInterface {
  id: string;
  name: string;
}

interface AlgorithmItemProps {
  id: string;
  name: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmInterface | null>>;
  selectedAlgorithm: AlgorithmInterface | null;
}

const AlgorithmItem = (props: AlgorithmItemProps) => {
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

interface AlgorithmSelection {
  selectedAlgorithm: AlgorithmInterface | null;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmInterface | null>>;
}

const AlgorithmSelection = (props: AlgorithmSelection) => {
  const { selectedAlgorithm, setAlgorithm } = props;
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
    <Grid container direction="column" wrap="nowrap" padding={3}>
      <Grid>
        <Header title="Select algorithm" />
      </Grid>
      <Grid>
        <Grid
          container
          direction="row"
          paddingY={2}
          marginLeft={0}
          flexWrap="nowrap"
          overflow="auto"
        >
          {algorithmList?.map((algorithm) => (
            <Grid
              item
              key={algorithm.id}
              paddingLeft={2}
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
      </Grid>
    </Grid>
  );
};

export default AlgorithmSelection;
