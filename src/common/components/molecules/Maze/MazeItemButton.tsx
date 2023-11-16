import { Button } from "@mui/material";
import { MazeProps } from "../../../types/maze";
import { Dispatch, SetStateAction } from "react";
import React from "react";
import { MazeItem } from "../../organisms/Maze/MazeItem";

const MazeItemButton = ({
  maze,
  selectedMaze,
  setMaze,
}: {
  maze: MazeProps;
  selectedMaze: MazeProps | null;
  setMaze: Dispatch<SetStateAction<MazeProps | null>>;
}) => {
  const handleSelectMaze = () => {
    if (selectedMaze?.id === maze.id) {
      setMaze(null);
    } else {
      setMaze(maze);
    }
  };
  return (
    <Button
      onClick={handleSelectMaze}
      sx={{
        padding: 0,
        width: 275,
        borderRadius: 7,
      }}
    >
      <MazeItem maze={maze} focus={maze.id === selectedMaze?.id} />
    </Button>
  );
};

export { MazeItem, MazeItemButton };
