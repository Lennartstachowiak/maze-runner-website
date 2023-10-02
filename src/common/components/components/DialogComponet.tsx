import { Dialog, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  id: string;
  openDialog?: boolean;
  handleCloseDialog: () => void;
  dialogTitle: JSX.Element;
  dialogContent: JSX.Element;
  dialogActions: JSX.Element;
}

const DialogComponent = (props: DialogProps) => {
  const {
    id,
    openDialog = true,
    handleCloseDialog = undefined,
    dialogTitle,
    dialogContent,
    dialogActions,
  } = props;
  return (
    <Dialog
      id={id}
      fullWidth
      maxWidth="sm"
      open={openDialog}
      onClose={handleCloseDialog}
    >
      {dialogTitle}
      {dialogContent}
      {dialogActions}
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
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
