import { Grid, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React from "react";
import { useRouter } from "next/router";
import MazePreviewBlock from "../../organisms/Maze/MazePreviewBlock";
import Header from "../../atoms/Header";
import { MazeProps } from "../../../types/maze";

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
      padding={0}
      width="70%"
      sx={{
        borderRadius: 7,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Grid container position="relative">
        <Grid paddingLeft={4} paddingTop={3}>
          <Header title="Selected maze" />
        </Grid>
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
            height: 120,
            width: 120,
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