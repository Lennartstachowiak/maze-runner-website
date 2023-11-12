import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Grid, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import LoginStatus from "./LoginStatus";
import { handleLogout } from "../../../modules/auth/api/AuthAPI";
import router from "next/router";
import { UserProps } from "../../types";
import { KeyedMutator } from "swr";

interface DrawerMenuProps {
  drawerState: boolean;
  handleDrawerClick: () => void;
  user: UserProps | null;
  mutate: KeyedMutator<unknown>;
}

const DrawerMenu = (props: DrawerMenuProps) => {
  const { drawerState, handleDrawerClick, user, mutate } = props;

  const handleClickLogout = async () => {
    try {
      await handleLogout();
      await mutate();
      handleDrawerClick();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToAlgorithm = () => {
    try {
      router.push("/my_algorithms");
      handleDrawerClick();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToOverview = () => {
    try {
      router.push("/overview");
      handleDrawerClick();
    } catch (error) {
      console.error(error);
    }
  };
  const handleGoToGenerateOwnMaze = () => {
    try {
      router.push("/my_mazes");
      handleDrawerClick();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Drawer anchor={"right"} open={drawerState} onClose={handleDrawerClick}>
      <IconButton
        aria-label="close"
        onClick={handleDrawerClick}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Grid
        container
        direction="column"
        sx={{
          padding: 4,
          minHeight: "85%",
        }}
      >
        <Grid item>
          <Button variant="text" color="primary" onClick={handleClickLogout}>
            <Typography variant="body1">Logout</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary" onClick={handleGoToAlgorithm}>
            <Typography variant="body1">My Algorithms</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            color="primary"
            onClick={handleGoToGenerateOwnMaze}
          >
            <Typography variant="body1">My Mazes</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary" onClick={handleGoToOverview}>
            <Typography variant="body1">Rules / Overview</Typography>
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          paddingX: 4,
          minHeight: "15%",
        }}
      >
        <LoginStatus user={user} />
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
