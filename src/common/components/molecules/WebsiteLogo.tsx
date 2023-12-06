import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const WebsiteLogo = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push("/");
      }}
    >
      <Box
        component="img"
        alt="Maze Runner Logo"
        sx={{ height: 70, width: 70, marginRight: 1.5, marginY: 1 }}
        src="favicon.ico"
      />
      <Typography
        variant="h3"
        fontWeight={300}
        color="secondary.dark"
        sx={{ flexGrow: 1 }}
      >
        Maze Runner
      </Typography>
    </Button>
  );
};

export default WebsiteLogo;
