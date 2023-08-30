import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import RegisterDialog from "./RegisterAndLogin";

const RegisterDialogButton = () => {
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);

  const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
  };

  const handleCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };

  return (
    <div>
      <Button variant="text" color="primary" onClick={handleOpenRegisterDialog}>
        <Typography
          variant="body1"
          paddingX={2}
          paddingY={1}
          borderRadius={3}
          sx={{
            color: (theme) => theme.palette.background.default,
            backgroundColor: (theme) => theme.palette.secondary.main,
          }}
        >
          Login / Register
        </Typography>
      </Button>
      <RegisterDialog
        openRegisterDialog={openRegisterDialog}
        handleCloseRegisterDialog={handleCloseRegisterDialog}
      />
    </div>
  );
};

export default RegisterDialogButton;
