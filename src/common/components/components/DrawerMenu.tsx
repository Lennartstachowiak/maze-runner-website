import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Grid, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import LoginStatus from "./LoginStatus";
import { handleLogout } from "../../../modules/auth/api/AuthAPI";
import router from "next/router";
import UserInterface from "../../types/user";

interface DrawerMenuProps {
  drawerState: boolean;
  handleDrawerClick: () => void;
  user: UserInterface | null;
}

const DrawerMenu = (props: DrawerMenuProps) => {
  const { drawerState, handleDrawerClick, user } = props;
  const handleClickLogout = () => {
    try {
      handleLogout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToAlgorithm = () => {
    try {
      router.push("/my_algorithms");
      handleDrawerClick();
    } catch (error) {
      console.log(error);
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
