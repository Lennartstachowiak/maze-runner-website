import { Dialog, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface RegisterDialogProps {
  openRegisterDialog?: boolean;
  handleCloseRegisterDialog: () => void;
  dialogTitle: JSX.Element;
  dialogContent: JSX.Element;
  dialogActions: JSX.Element;
}

const DialogComponent = (props: RegisterDialogProps) => {
  const {
    openRegisterDialog = true,
    handleCloseRegisterDialog = undefined,
    dialogTitle,
    dialogContent,
    dialogActions,
  } = props;
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={openRegisterDialog}
      onClose={handleCloseRegisterDialog}
    >
      {dialogTitle}
      {dialogContent}
      {dialogActions}
      <IconButton
        aria-label="close"
        onClick={handleCloseRegisterDialog}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
};

export default DialogComponent;
