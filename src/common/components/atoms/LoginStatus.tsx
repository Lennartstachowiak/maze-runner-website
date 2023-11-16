import { Grid, Typography } from "@mui/material";
import React from "react";
import UserInterface from "../../types/user";

interface LoginStatusProps {
  user: UserInterface | null;
}

const LoginStatus = (props: LoginStatusProps) => {
  const { user } = props;
  return (
    <Grid container spacing={0} direction="column" justifyContent="end">
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
  );
};

export default LoginStatus;
