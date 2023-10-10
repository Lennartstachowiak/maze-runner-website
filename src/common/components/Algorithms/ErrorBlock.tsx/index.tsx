import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ErrorBlock = (message: string) => {
  return (
    <Grid container spacing={0}>
      <Typography variant="body1" color="red">
        {message}
      </Typography>
    </Grid>
  );
};

export default ErrorBlock;
