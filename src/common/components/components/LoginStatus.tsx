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
        <div>
          <Typography variant="h6" color="initial">
            Logged in
          </Typography>
          <Typography variant="subtitle1" color="initial">
            ID: {user.id}
          </Typography>
          <Typography variant="subtitle1" color="initial">
            Email: {user.email}
          </Typography>
        </div>
      ) : (
        <div>
          <Typography variant="subtitle1" color="initial">
            You are not logged in
          </Typography>
        </div>
      )}
    </Grid>
  );
};

export default LoginStatus;
