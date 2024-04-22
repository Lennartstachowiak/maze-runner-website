import Grid from "@mui/material/Grid";
import MazeSelection from "../template/Maze/MazeSelection";
import { MazePreviewCard } from "../molecules/Maze/MazePreviewWrapper";
import React, { useRef, useEffect } from "react";
import {
  useGetFollowedMazes,
  useGetMazes,
  useGetMyMazes,
} from "../../../modules/API";
import { MazeProps } from "../../types/maze";

const Homepage = () => {
  const { mazes, isLoading, isError } = useGetMazes();
  const {
    mazes: myMazes,
    isLoading: myMazesLoading,
    isError: myMazesError,
  } = useGetMyMazes();
  const {
    followedMazes,
    isLoading: followedMazeLoading,
    isError: followedMazeError,
  } = useGetFollowedMazes();
  const [selectedMaze, setMaze] = React.useState<MazeProps | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // To prevent ref mistake with followed maze selection
  //  I added a second check called isMyMaze
  const isMyMaze =
    myMazes?.filter((maze) => maze.id == selectedMaze?.id).length > 0;
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
      {selectedMaze?.official === false && isMyMaze && (
        <Grid ref={cardRef} item sx={{ width: "100%" }}>
          <MazePreviewCard {...selectedMaze} />
        </Grid>
      )}
      {followedMazes?.length > 0 && (
        <Grid item sx={{ width: "100%" }}>
          <MazeSelection
            mazes={followedMazes}
            selectedMaze={selectedMaze}
            setMaze={setMaze}
            title="Select a maze you are following (Practice)"
            isLoading={followedMazeLoading}
            isError={followedMazeError}
          />
        </Grid>
      )}
      {selectedMaze?.official === false && !isMyMaze && (
        <Grid ref={cardRef} item sx={{ width: "100%" }}>
          <MazePreviewCard {...selectedMaze} />
        </Grid>
      )}
    </Grid>
  );
};

export default Homepage;
