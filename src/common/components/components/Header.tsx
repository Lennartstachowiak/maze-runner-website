import { Grid, Typography } from "@mui/material";
import React from "react";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  const { title } = props;
  return (
    <Grid container>
      <Typography variant="h2" color="secondary.main" paddingRight={3}>
        {title}
      </Typography>
    </Grid>
  );
};

export default Header;
