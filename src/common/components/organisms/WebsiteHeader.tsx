import React from "react";
import { AuthPropsInterface } from "../../types";
import { AppBar, Box, Toolbar } from "@mui/material";
import RegisterDialogButton from "../molecules/RegisterDialogButton";
import DrawerMenu from "../molecules/DrawerMenu";
import WebsiteLogo from "../molecules/WebsiteLogo";
import UserButton from "../atoms/Button/UserButton";

interface HeaderProps {
  authProps: AuthPropsInterface;
}

const Header = (props: HeaderProps) => {
  const { user, mutate } = props.authProps;
  // const pathname = router.pathname;

  const [drawerState, setDrawerState] = React.useState(false);

  const handleDrawerClick = () => {
    setDrawerState(!drawerState);
  };
  const userInicial = user?.email.slice(0, 1).toUpperCase();
  return (
    <>
      <AppBar
        position="static"
        sx={{
          margin: 0,
          boxShadow: 0,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <WebsiteLogo />
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <UserButton
                handleDrawerClick={handleDrawerClick}
                userInicial={userInicial}
              />
            ) : (
              <RegisterDialogButton mutate={mutate} />
            )}
            <DrawerMenu
              drawerState={drawerState}
              handleDrawerClick={handleDrawerClick}
              user={user}
              mutate={mutate}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
