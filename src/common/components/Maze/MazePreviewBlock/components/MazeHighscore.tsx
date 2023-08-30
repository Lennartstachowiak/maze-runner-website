import { Grid, Typography } from "@mui/material";
import React from "react";

interface PlayerProps {
  name: string;
  score: number;
}

const PlayerScore = ({ player }: { player: PlayerProps }) => {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography variant="h5" color="secondary.main">
          {player.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5" color="secondary.main">
          {player.score}
        </Typography>
      </Grid>
    </Grid>
  );
};

interface MazeHighscoreComponentProps {
  highscores: [];
}

const MazeHighscore = (props: MazeHighscoreComponentProps) => {
  const { highscores } = props;
  return (
    <Grid item height="100%" width="100%">
      <Grid
        item
        width="100%"
        paddingX={3}
        paddingY={2}
        sx={{
          borderRadius: 5,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h4" color="secondary.main">
          Highscores
        </Typography>
        <Grid item paddingX={1} paddingY={1}>
          {highscores.map((player: PlayerProps, index) => (
            <Grid key={index}>
              <PlayerScore player={player} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MazeHighscore;
