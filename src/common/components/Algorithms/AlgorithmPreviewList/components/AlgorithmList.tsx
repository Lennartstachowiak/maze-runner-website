import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import AlgorithmItem from "./AlgorithmItem";
import { AlgorithmListDirections } from "../types";
import Header from "../../../components/Header";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const AlgorithmList = (props: AlgorithmListDirections) => {
  const {
    title,
    selectedAlgorithm,
    setAlgorithm,
    flexWrap,
    algorithmList,
    handelAddAlgorithm,
  } = props;
  return (
    <Grid container direction="column" wrap="nowrap" padding={3}>
      <Grid>
        <Header title={title} />
      </Grid>
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
                algorithm.id === selectedAlgorithm?.id ? 1.05 : 1
              })`,
            }}
          >
            <AlgorithmItem
              id={algorithm.id}
              name={algorithm.name}
              code={algorithm.code}
              setAlgorithm={setAlgorithm}
              selectedAlgorithm={selectedAlgorithm}
            />
          </Grid>
        ))}
        {handelAddAlgorithm && (
          <Grid
            item
            key="add-algorithm"
            paddingLeft={2}
            paddingBottom={flexWrap === "wrap" ? 2 : 0}
          >
            <Button
              onClick={handelAddAlgorithm}
              sx={{
                height: "100%",
                width: 200,
                color: (theme) => theme.palette.primary.dark,
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: 7,
              }}
            >
              <AddRoundedIcon sx={{ color: "grey.400" }} />
              <Typography
                variant="h5"
                color="grey.400"
                paddingY={1.5}
                paddingLeft={0.3}
              >
                Add new algorithm
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default AlgorithmList;
