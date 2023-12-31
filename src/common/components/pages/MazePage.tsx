import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import {
  getMazeAlgorithmSolution,
  useGetAlgorithms,
  useGetSingleMaze,
} from "../../../modules/API";
import LoadingDialog from "../molecules/LoadingDialog";
import MazePreviewBlock from "../organisms/Maze/MazePreviewBlock";
import Menu from "../organisms/Maze/SolveMenu";
import RegisterDialog from "../organisms/RegisterAndLogin";
import { AlgorithmInterface } from "../../types/Algorithm/types";
import { AlgorithmListHorizontal } from "../organisms/Algorithm/AlgorithmPreviewBlock";
import { CircularProgress } from "@mui/material";
import { MazeProps } from "../../types/maze";
import { KeyedMutator } from "swr";
import { AuthPropsInterface } from "../../types";

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

const MazePage = (componentProps: AuthPropsInterface) => {
  const { user, mutate: authMutate } = componentProps;
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
    mutate,
  }: {
    maze: MazeProps;
    isLoading: boolean;
    isError: boolean;
    mutate: KeyedMutator<unknown>;
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
      <RegisterDialog
        handleCloseRegisterDialog={handleCloseRegisterDialog}
        mutate={authMutate}
      />
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
      if (!mazeSearchSolution) {
        alert("Error");
        return;
      }
      setMazeSolution(mazeSearchSolution);
      score.current.steps = mazeSearchSolution.solution.length;
      score.current.visitedSteps = mazeSearchSolution.visited.length;
      score.current.score = mazeSearchSolution.score;
      await mutate();
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

export default MazePage;
