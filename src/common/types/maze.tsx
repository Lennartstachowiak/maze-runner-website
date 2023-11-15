import { Dispatch, SetStateAction } from "react";

export interface MazeProps {
  id: string;
  name: string;
  imgLink: string;
  difficulty: string;
  structure: [][];
  highscores: [];
  official: boolean;
}

export type GetMazesResponse = {
  mazes: MazeProps;
  isLoading: boolean;
  isError: Error;
};

export interface MazeListViewProps {
  mazes: MazeProps[];
  selectedMaze?: MazeProps;
}

export interface MazeSelectionProps {
  mazes: MazeProps[];
  selectedMaze?: MazeProps | null;
  setMaze?: Dispatch<SetStateAction<MazeProps | null>>;
  title: string;
  isLoading: boolean;
  isError: boolean;
}

const GenerateTypesEnum = {
  RecursiveBacktracking: "RecursiveBacktracking",
  Sidewinder: "Sidewinder",
};

export type GenerateTypes = keyof typeof GenerateTypesEnum;
