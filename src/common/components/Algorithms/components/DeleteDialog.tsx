import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import DialogComponent from "../../components/DialogComponet";
import { AlgorithmInterface } from "../AlgorithmPreviewList/types";

interface DeleteDialogProps {
  openDeleteDialog?: boolean;
  handleCloseDeleteDialog: () => void;
  selectedAlgorithm: AlgorithmInterface | null;
  handleDeleteAlgorithm: (algorithmId: string) => Promise<void>;
}

const DeleteDialog = (props: DeleteDialogProps) => {
  const {
    openDeleteDialog = true,
    handleCloseDeleteDialog,
    selectedAlgorithm,
    handleDeleteAlgorithm,
  } = props;
  const algorithmName = selectedAlgorithm?.name;
  const algorithmId = selectedAlgorithm?.id;
  const handleDeleteOnClick = () => {
    handleDeleteAlgorithm(algorithmId!);
    handleCloseDeleteDialog();
  };
  const dialogTitle = (
    <DialogTitle id={"delete-title"}>
      <Typography variant="h3" color="initial">
        Delete Algorithm
      </Typography>
    </DialogTitle>
  );
  const dialogContent = (
    <DialogContent>
      <Typography variant="body1" color="initial">
        Do you want to delete <strong>{algorithmName}</strong>?
      </Typography>
    </DialogContent>
  );
  const dialogActions = (
    <DialogActions>
      <Button variant="text" color="error" onClick={handleDeleteOnClick}>
        Delete
      </Button>
      <Button
        variant="text"
        sx={{ color: "black" }}
        onClick={handleCloseDeleteDialog}
      >
        Keep
      </Button>
    </DialogActions>
  );
  return (
    <DialogComponent
      id="dialog-delete"
      openDialog={openDeleteDialog}
      handleCloseDialog={handleCloseDeleteDialog}
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      dialogActions={dialogActions}
    />
  );
};

export default DeleteDialog;
