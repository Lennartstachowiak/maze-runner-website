import { Avatar, Box, Grid, IconButton, Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import RegisterDialogButton from "./RegisterDialogButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DrawerMenu from "./DrawerMenu";
import { AuthPropsInterface } from "../../types";

interface HeaderProps {
  authProps: AuthPropsInterface;
}

const Header = (props: HeaderProps) => {
  const { user, mutate } = props.authProps;
  const router = useRouter();
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
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            <Box
              component="img"
              alt="logo"
              sx={{ height: 25, width: 25, marginRight: 1.5 }}
              src="favicon.ico"
            />
            <Typography variant="h4" color="primary.dark" sx={{ flexGrow: 1 }}>
              Micromouse Simulator
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <IconButton aria-label="user" onClick={handleDrawerClick}>
                <Avatar
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.main,
                  }}
                >
                  {userInicial}
                </Avatar>
              </IconButton>
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

const Footer = () => {
  return <div></div>;
};

type ChildrenType = React.ReactNode | string;

interface WrapperProps {
  children: ChildrenType;
  authProps: AuthPropsInterface;
}

const Wrapper = (props: WrapperProps) => {
  const { children, authProps } = props;
  const router = useRouter();
  const isRootPath = router.pathname === "/";
  return (
    <div>
      <Header authProps={authProps} />
      <Container>
        <Grid container direction="row">
          {!isRootPath && (
            <Grid item xs={0.7}>
              <IconButton
                aria-label="back"
                onClick={() => router.back()}
                size="large"
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item xs={!isRootPath ? 11.3 : 12}>
            {children}
          </Grid>
        </Grid>

        <Footer />
      </Container>
    </div>
  );
};

export default Wrapper;
