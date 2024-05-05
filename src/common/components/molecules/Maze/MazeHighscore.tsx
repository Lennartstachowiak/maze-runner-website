import { Grid, Typography } from "@mui/material";
import React from "react";
import { PlayerProps } from "../../../types/Maze/previewTypes";
import PlayerScore from "./PlayerScore";
import TextButton from "../../atoms/Button/TextButton";
import router from "next/router";

interface MazeHighscoreComponentProps {
  highscores: [];
}

const MazeHighscore = (props: MazeHighscoreComponentProps) => {
  const { highscores } = props;
  const sorted_highscores = highscores.sort(
    (a: PlayerProps, b: PlayerProps) => a.score - b.score
  );
  const top_3_players = sorted_highscores.slice(0, 3);
  const handleOnClickUser = (userId: string) => {
    router.push(`/user/${userId}`);
  };
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
        <Grid item paddingX={1} paddingY={1} overflow="auto">
          {top_3_players.map((player: PlayerProps, index) => (
            <Grid
              container
              key={index}
              direction="row"
              alignItems="center"
              flexWrap="nowrap"
              spacing={2}
            >
              <Grid item>
                <Typography variant="h5" color="secondary.main">
                  {index + 1}.
                </Typography>
              </Grid>
              <Grid item>
                <PlayerScore player={player} />
              </Grid>
              <Grid marginLeft="auto">
                <TextButton
                  id="profile-button"
                  text={"Go to profile"}
                  handleClick={() => handleOnClickUser(player.user_id)}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MazeHighscore;
