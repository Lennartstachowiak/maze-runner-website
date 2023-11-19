import React, { useState } from "react";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { MazeProps } from "../../../types/maze";

interface MazeStructureProps {
  maze: MazeProps;
}

const MazeStructure = (props: MazeStructureProps) => {
  const { maze } = props;
  const structure = maze.structure;
  const [prettyView, setPrettyView] = useState(true);
  const handleChangeView = () => {
    setPrettyView((currentState) => !currentState);
  };
  const isSmallScreen = useMediaQuery("(max-width: 499px)");
  const strucutreList = prettyView ? (
    structure.map((row, indexRow) => (
      <Grid
        container
        wrap="nowrap"
        spacing={3}
        key={`${indexRow}`}
        paddingY={0.8}
      >
        <Grid item>
          <Typography variant="h5" color="initial" noWrap>
            Row {indexRow + 1}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container wrap="nowrap">
            {row.map((item, indexItem) => (
              <Grid item key={`${indexRow}${indexItem}`} paddingRight={2}>
                <Typography variant="h5" color="initial" noWrap>
                  Cell {indexItem + 1}
                </Typography>
                <Typography variant="body1" color="initial">
                  {JSON.stringify(item)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    ))
  ) : (
    <Typography variant="body1" color="initial">
      {JSON.stringify(structure)}
    </Typography>
  );
  return (
    <Grid
      container
      padding={isSmallScreen ? 4 : 7}
      marginBottom={5}
      sx={{
        borderRadius: 10,
        color: (theme) => theme.palette.background.default,
        backgroundColor: (theme) => theme.palette.background.paper,
        width: "100%",
      }}
    >
      <Grid container width="100%" justifyContent="space-between">
        <Grid item paddingBottom={2}>
          <Typography variant="h3" color="initial">
            Maze Structure
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleChangeView}
          >
            {prettyView ? "Change to default view" : "Change to pretty view"}
          </Button>
        </Grid>
      </Grid>

      <Grid overflow="auto" item>
        {strucutreList}
      </Grid>
    </Grid>
  );
};

export default MazeStructure;
