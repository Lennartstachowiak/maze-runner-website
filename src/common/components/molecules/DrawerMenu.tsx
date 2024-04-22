import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import LoginStatus from "../atoms/LoginStatus";
import { handleLogout } from "../../../modules/auth/api/AuthAPI";
import { searchUser } from "../../../modules/API";
import router from "next/router";
import { UserProps } from "../../types";
import UserInterface from "../../types/user";
import { KeyedMutator } from "swr";
import TextButton from "../atoms/Button/TextButton";
import UserCard from "../molecules/User/UserCard";

interface DrawerMenuProps {
  drawerState: boolean;
  handleDrawerClick: () => void;
  user: UserProps | null;
  mutate: KeyedMutator<unknown>;
}

const DrawerMenu = (props: DrawerMenuProps) => {
  const { drawerState, handleDrawerClick, user, mutate } = props;
  const [userSearch, setUserSearch] = React.useState<string>("");
  const [userList, setUserList] = React.useState<UserInterface[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

  const handleChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserSearch(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const userListData = await searchUser(userSearch);
    if (userListData.length > 0) {
      setUserList(userListData);
    } else {
      setUserList([]);
    }
    setIsLoading(false);
  };

  const handleOnClickUser = (user: UserInterface) => {
    router.push(`/user/${user.id}`);
    handleDrawerClick();
  };

  const handleOnClickFollowing = async () => {
    router.push(`/user/follows`);
    handleDrawerClick();
  };

  const handleOnClickFollower = async () => {
    router.push(`/user/followers`);
    handleDrawerClick();
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
          height: "100%",
        }}
      >
        <Grid
          item
          sx={{
            paddingBottom: 5,
          }}
        >
          <LoginStatus user={user} />
        </Grid>
        <Grid item>
          <TextButton text={"Logout"} handleClick={handleClickLogout} />
        </Grid>
        <Grid item>
          <TextButton
            text={"My Algorithms"}
            handleClick={handleGoToAlgorithm}
          />
        </Grid>
        <Grid item>
          <TextButton
            text={"My Mazes"}
            handleClick={handleGoToGenerateOwnMaze}
          />
        </Grid>
        <Grid item>
          <TextButton
            text={"Rules / Overview"}
            handleClick={handleGoToOverview}
          />
        </Grid>
        <Grid>
          <TextButton text="My follows" handleClick={handleOnClickFollowing} />
        </Grid>
        <Grid>
          <TextButton text="My followers" handleClick={handleOnClickFollower} />
        </Grid>
        <Grid item sx={{ marginTop: 5 }}>
          <Grid container display="flex" flexDirection="column">
            <Grid item>
              <TextField
                id="search_player"
                label="Search for player:"
                value={userSearch}
                onChange={handleChangeSearchText}
              />
              <TextButton text={"Search"} handleClick={handleSearch} />
            </Grid>
            <Grid item>
              {isLoading ? (
                <Typography variant="body1">Loading...</Typography>
              ) : (
                <></>
              )}
              {userList?.map((user: UserInterface) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onClick={handleOnClickUser}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default DrawerMenu;
