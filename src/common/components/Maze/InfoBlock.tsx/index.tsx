import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useGetSingleMaze } from "../../../../modules/API";
import { MazeProps } from "../../Homepage/components/MazePreviewWrapper";
import GameComponent from "../MazePreviewBlock/components/MazeRender";
import { CircularProgress, Button } from "@mui/material";
import { MazeSolution } from "..";
import router from "next/router";

interface InfoBlockProps {
  mazeSolution: MazeSolution | null;
  maze?: MazeProps;
}

const InfoBlock = (props: InfoBlockProps) => {
  const mazeSolution = props.mazeSolution;
  let maze = props.maze;
  let message;
  if (mazeSolution?.error) {
    message = mazeSolution.error;
  }
  // Default is maze if not other provided
  if (!maze) {
    const {
      maze: fetchedMaze,
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
    maze = fetchedMaze;
  }

  const handleGoToOverview = () => {
    try {
      router.push("/overview");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      container
      rowSpacing={4}
      height="70vh"
      sx={{ width: "100%", maxWidth: "30vw" }}
    >
      <Grid item sx={{ width: "100%" }}>
        <Button
          onClick={handleGoToOverview}
          sx={{
            padding: 0,
            borderRadius: 10,
            color: (theme) => theme.palette.background.default,
            backgroundColor: (theme) => theme.palette.background.paper,
            width: "100%",
          }}
        >
          <Grid container padding={7} overflow="auto">
            {maze && (
              <Grid container justifyContent="center" spacing={0}>
                <Grid item width="100%" paddingBottom={2}>
                  <Typography variant="h3" color="initial" textAlign="left">
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
        </Button>
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
