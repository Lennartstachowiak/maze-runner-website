import React from "react";
import { Grid, Typography } from "@mui/material";
import router from "next/router";
import { useGetFollowing } from "../../modules/API";
import LoadingDialog from "../../common/components/molecules/LoadingDialog";
import UserInterface from "../../common/types/user";
import UserCard from "../../common/components/molecules/User/UserCard";
import Header from "../../common/components/atoms/Header";

const FollowPage = () => {
  const { userFollows, isLoading } = useGetFollowing();

  if (isLoading) {
    return <LoadingDialog loading={isLoading} />;
  }

  const handleOnClickUser = (user: UserInterface) => {
    router.push(`/user/${user.id}`);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Header title="Your Follows" />
        <Typography
          variant="body1"
          sx={{
            padding: 2,
            marginY: 2,
            borderRadius: 3,
            border: "2px solid grey",
            backgroundColor: (theme) => theme.palette.primary.light,
          }}
        >
          💡 <b>You</b> are following these users.
        </Typography>
      </Grid>
      <Grid item>
        {userFollows?.map((user: UserInterface) => (
          <UserCard key={user.id} user={user} onClick={handleOnClickUser} />
        ))}
      </Grid>
    </Grid>
  );
};

export default FollowPage;
