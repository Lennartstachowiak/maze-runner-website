import Grid from "@mui/material/Grid";
import MazeSelection from "./components/MazeSelection";
import { MazePreviewCard } from "./components/MazePreviewWrapper";
import React, { useRef, useEffect } from "react";
import { useGetMazes, useGetMyMazes } from "../../../modules/API";
import { MazeProps } from "../../types/maze";

const Homepage = () => {
  const { mazes, isLoading, isError } = useGetMazes();
  const {
    mazes: myMazes,
    isLoading: myMazesLoading,
    isError: myMazesError,
  } = useGetMyMazes();
  const [selectedMaze, setMaze] = React.useState<MazeProps | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedMaze]);
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
          title="Select an Official Maze (Competitive)"
          isLoading={isLoading}
          isError={isError}
        />
      </Grid>
      {selectedMaze?.official && (
        <Grid ref={cardRef} item sx={{ width: "100%" }}>
          <MazePreviewCard {...selectedMaze} />
        </Grid>
      )}
      {myMazes?.length > 0 && (
        <Grid item sx={{ width: "100%" }}>
          <MazeSelection
            mazes={myMazes}
            selectedMaze={selectedMaze}
            setMaze={setMaze}
            title="Select your own Maze (Practice)"
            isLoading={myMazesLoading}
            isError={myMazesError}
          />
        </Grid>
      )}
      {selectedMaze?.official === false && (
        <Grid ref={cardRef} item sx={{ width: "100%" }}>
          <MazePreviewCard {...selectedMaze} />
        </Grid>
      )}
    </Grid>
  );
};

export default Homepage;
