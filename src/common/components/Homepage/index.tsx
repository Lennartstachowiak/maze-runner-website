import Grid from "@mui/material/Grid";
import MazeSelection from "./components/MazeSelection";
import { MazePreviewCard, MazeProps } from "./components/MazePreviewWrapper";
import React from "react";

import LoadingDialog from "../components/LoadingDialog";
import Typography from "@mui/material/Typography";
import { useGetMazes } from "../../../modules/API";

const Homepage = () => {
  const { mazes, isLoading, isError } = useGetMazes();
  const [selectedMaze, setMaze] = React.useState<MazeProps | null>(null);
  if (isLoading) {
    return <LoadingDialog loading={isLoading} />;
  }
  if (isError) {
    return (
      <Typography variant="body1" color="initial">
        Error
      </Typography>
    );
  }
  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      wrap="wrap"
      sx={{ width: "100%" }}
    >
      <Grid item sx={{ width: "100%" }}>
        <MazeSelection
          mazes={mazes}
          selectedMaze={selectedMaze}
          setMaze={setMaze}
        />
      </Grid>
      {selectedMaze && (
        <Grid item sx={{ width: "100%" }}>
          <MazePreviewCard {...selectedMaze} />
        </Grid>
      )}
    </Grid>
  );
};

export default Homepage;
