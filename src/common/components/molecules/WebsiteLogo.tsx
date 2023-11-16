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
        alt="logo"
        sx={{ height: 25, width: 25, marginRight: 1.5 }}
        src="favicon.ico"
      />
      <Typography variant="h4" color="primary.dark" sx={{ flexGrow: 1 }}>
        Micromouse Simulator
      </Typography>
    </Button>
  );
};

export default WebsiteLogo;
