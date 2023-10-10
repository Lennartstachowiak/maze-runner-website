import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useGetSingleMaze } from "../../../../modules/API";
import { MazeProps } from "../../Homepage/components/MazePreviewWrapper";
import GameComponent from "../../Maze/MazePreviewBlock/components/MazeRender";
import { CircularProgress } from "@mui/material";
import { MazeSolution } from "../../Maze";

interface InfoBlockProps {
  mazeSolution: MazeSolution | null;
}

const InfoBlock = (props: InfoBlockProps) => {
  const { mazeSolution } = props;
  let message;
  if (mazeSolution?.error) {
    message = mazeSolution.error;
  }
  const {
    maze,
    isLoading: isMazeLoading,
    isError: isMazeError,
  }: {
    maze: MazeProps;
    isLoading: boolean;
    isError: boolean;
  } = useGetSingleMaze("100");

  if (isMazeLoading) {
    return <CircularProgress />;
  }
  if (isMazeError) {
    <Typography variant="body1" color="red">
      Error
    </Typography>;
  }
  return (
    <Grid container rowSpacing={4} height="70vh" sx={{ width: "100%" }}>
      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          marginX={4}
          padding={7}
          overflow="auto"
          sx={{
            borderRadius: 10,
            color: (theme) => theme.palette.background.default,
            backgroundColor: (theme) => theme.palette.background.paper,
            width: "100%",
          }}
        >
          {maze && (
            <Grid container justifyContent="center" spacing={0}>
              <Grid item width="100%" paddingBottom={2}>
                <Typography variant="h3" color="initial">
                  {maze.name}
                </Typography>
              </Grid>
              <Grid item>
                <GameComponent
                  mazeStructure={maze?.structure}
                  mazeSolution={mazeSolution}
                  size={200}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      {message && (
        <Grid item>
          <Grid
            container
            marginX={4}
            paddingY={4}
            paddingX={7}
            height="100%"
            overflow="auto"
            sx={{
              borderRadius: 10,
              color: (theme) => theme.palette.background.default,
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            <Typography variant="h5" color="red">
              Error Message
            </Typography>
            <Typography variant="body1" fontSize={12} color="red">
              <pre>{message}</pre>
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default InfoBlock;
