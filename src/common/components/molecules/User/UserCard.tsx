import UserInterface from "../../../types/user";
import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";
import TextButton from "../../atoms/Button/TextButton";

type UserIntefaceProps = {
  user: UserInterface;
  onClick: (user: UserInterface) => void;
};

const UserCard = (props: UserIntefaceProps) => {
  const { user, onClick } = props;
  return (
    <Grid
      container
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      sx={{
        marginTop: 1,
        padding: 0.5,
        borderRadius: 3.5,
        border: "1px solid grey",
      }}
    >
      <Typography variant="body1" color="initial">
        {user.email}
      </Typography>
      <TextButton text={"Go to profile"} handleClick={() => onClick(user)} />
    </Grid>
  );
};

export default UserCard;
