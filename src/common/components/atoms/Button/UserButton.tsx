import { Avatar, IconButton } from "@mui/material";
import React from "react";

interface UserButtonProps {
  handleDrawerClick: () => void;
  userInicial: string | undefined;
}

const UserButton = (props: UserButtonProps) => {
  const { handleDrawerClick, userInicial } = props;
  return (
    <IconButton aria-label="user" onClick={handleDrawerClick}>
      <Avatar
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.main,
        }}
      >
        {userInicial}
      </Avatar>
    </IconButton>
  );
};

export default UserButton;
