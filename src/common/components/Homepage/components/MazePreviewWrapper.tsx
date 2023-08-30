import { Grid, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React from "react";
import { useRouter } from "next/router";
import MazePreviewBlock from "../../Maze/MazePreviewBlock";
import Header from "../../components/Header";

export interface MazeProps {
  id: string;
  name: string;
  imgLink: string;
  difficulty: string;
  structure: [][];
  highscores: [];
}

export const MazePreviewCard = (props: MazeProps) => {
  const { id, name, imgLink, difficulty, structure, highscores } = props;
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: "/maze",
      query: { id: id },
    });
  };
  return (
    <Grid
      container
      padding={3}
      sx={{
        borderRadius: 7,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Grid container position="relative">
        <Header title="Selected maze" />
        <MazePreviewBlock
          name={name}
          difficulty={difficulty}
          highscores={highscores}
          imgLink={imgLink}
          mazeStructure={structure}
        />
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: 150,
            width: 150,
            color: (theme) => theme.palette.background.default,
            backgroundColor: (theme) => theme.palette.secondary.main,
          }}
          onClick={handleClick}
        >
          <PlayArrowIcon sx={{ height: 75, width: 75 }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
