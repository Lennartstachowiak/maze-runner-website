import { Grid, Typography } from "@mui/material";
import React from "react";
import UserInterface from "../../types/user";

interface LoginStatusProps {
  user: UserInterface | null;
}

const LoginStatus = (props: LoginStatusProps) => {
  const { user } = props;
  return (
    <div id="user-status">
      <Grid container spacing={0} direction="column">
        {user != null ? (
          <Typography variant="subtitle1" color="initial">
            {user.email}
          </Typography>
        ) : (
          <Typography variant="subtitle1" color="initial">
            You are not logged in
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default LoginStatus;
