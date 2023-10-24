import { Dispatch, SetStateAction } from "react";

export interface MazeProps {
  id: string;
  name: string;
  imgLink: string;
  difficulty: string;
  structure: [][];
  highscores: [];
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
}
