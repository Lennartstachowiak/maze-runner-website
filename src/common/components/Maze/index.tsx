import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import {
  getMazeAlgorithmSolution,
  useGetAlgorithms,
  useGetSingleMaze,
} from "../../../modules/API";
import LoadingDialog from "../components/LoadingDialog";
import MazePreviewBlock from "./MazePreviewBlock";
import Menu from "./Menu";
import RegisterDialog from "../components/RegisterAndLogin";
import { AlgorithmInterface } from "../Algorithms/AlgorithmPreviewList/types";
import { AlgorithmListHorizontal } from "../Algorithms/AlgorithmPreviewList/AlgorithmPreviewBlock";
import { CircularProgress } from "@mui/material";
import { MazeProps } from "../../types/maze";

export type ScoreType = {
  steps: number;
  visitedSteps: number;
  score: number;
};

export type MazeSolution = {
  solution: [];
  visited: [];
  score: number;
  error: string;
};

interface UserProps {
  email: string;
  id: string;
}
interface componentPropsInterface {
  user: UserProps;
}

const MazePreview = (componentProps: componentPropsInterface) => {
  const { user } = componentProps;
  const route = useRouter();
  const score = useRef<ScoreType>({ steps: 0, visitedSteps: 0, score: 0 });
  const [mazeSolution, setMazeSolution] = useState<MazeSolution | null>(null);
  const [selectedAlgorithm, setAlgorithm] = useState<AlgorithmInterface | null>(
    null
  );
  const id = route.query.id as string;
  const {
    maze,
    isLoading: isMazeLoading,
    isError: isMazeError,
  }: {
    maze: MazeProps;
    isLoading: boolean;
    isError: boolean;
  } = useGetSingleMaze(id);

  const {
    algorithmList,
    isLoading: isAlgorithmLoading,
    isError: isAlgorithmError,
  }: {
    algorithmList: AlgorithmInterface[];
    isLoading: boolean;
    isError: boolean;
  } = useGetAlgorithms();

  if (!user) {
    const handleCloseRegisterDialog = () => {
      route.back();
    };
    return (
      <RegisterDialog handleCloseRegisterDialog={handleCloseRegisterDialog} />
    );
  }
  if (isMazeLoading) {
    return <LoadingDialog loading={isMazeLoading} />;
  }
  if (isMazeError) {
    return (
      <Typography variant="body1" color="initial">
        Error
      </Typography>
    );
  }
  if (maze) {
    const { name, difficulty, imgLink, highscores, structure } = maze;
    const isDiabled = !selectedAlgorithm;
    const handleStart = async () => {
      if (!selectedAlgorithm?.id || !maze?.id) {
        alert("Error");
        return;
      }
      const mazeSearchSolution: MazeSolution = await getMazeAlgorithmSolution({
        algorithmId: selectedAlgorithm?.id,
        mazeId: maze?.id,
      });
      setMazeSolution(mazeSearchSolution);
      score.current.steps = mazeSearchSolution.solution.length;
      score.current.visitedSteps = mazeSearchSolution.visited.length;
      score.current.score = mazeSearchSolution.score;
    };

    return (
      <Grid container spacing={3} paddingBottom={8}>
        <Grid item width="100%">
          {isAlgorithmLoading && <CircularProgress />}
          {isAlgorithmError && <>Error</>}
          <AlgorithmListHorizontal
            title="Select an algorithm"
            selectedAlgorithm={selectedAlgorithm}
            setAlgorithm={setAlgorithm}
            algorithmList={algorithmList}
          />
        </Grid>
        <Grid item width="100%">
          <MazePreviewBlock
            name={name}
            difficulty={difficulty}
            highscores={highscores}
            imgLink={imgLink}
            mazeStructure={structure}
            mazeSolution={mazeSolution}
          />
        </Grid>
        <Grid item width="100%">
          <Menu
            isDiabled={isDiabled}
            handleStart={handleStart}
            score={score.current}
          />
        </Grid>
      </Grid>
    );
  }
};

export default MazePreview;
