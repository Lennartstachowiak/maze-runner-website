import React, { ChangeEvent, useEffect, useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import DialogComponent from "../DialogComponet";
import { AlgorithmInterface } from "../../../types/Algorithm/types";

interface RenameDialogProps {
  openRenameDialog?: boolean;
  handleCloseRenameDialog: () => void;
  selectedAlgorithm: AlgorithmInterface | null;
  handleEditName: (algorithmId: string, newName: string) => Promise<void>;
}

const RenameDialog = (props: RenameDialogProps) => {
  const {
    openRenameDialog = true,
    handleCloseRenameDialog,
    selectedAlgorithm,
    handleEditName,
  } = props;
  const algorithmName = selectedAlgorithm?.name;
  const algorithmId = selectedAlgorithm?.id;

  const [newAlgorithmName, setAlgorithmName] = useState(algorithmName!);

  useEffect(() => {
    setAlgorithmName(algorithmName!);
  }, [selectedAlgorithm]);

  const handleRenameOnClick = () => {
    handleEditName(algorithmId!, newAlgorithmName);
    handleCloseRenameDialog();
  };
  const handleRenameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAlgorithmName(event.target.value);
  };

  const dialogTitle = (
    <DialogTitle id={"delete-title"}>
      <Typography variant="h3" color="initial">
        Rename Algorithm
      </Typography>
    </DialogTitle>
  );
  const dialogContent = (
    <DialogContent>
      <TextField
        id="rename-algorithm"
        label=""
        fullWidth
        value={newAlgorithmName}
        onChange={handleRenameChange}
      />
    </DialogContent>
  );
  const dialogActions = (
    <DialogActions>
      <Button variant="text" color="info" onClick={handleRenameOnClick}>
        Rename
      </Button>
      <Button
        variant="text"
        sx={{ color: "black" }}
        onClick={handleCloseRenameDialog}
      >
        Abort
      </Button>
    </DialogActions>
  );
  return (
    <DialogComponent
      id="dialog-rename"
      openDialog={openRenameDialog}
      handleCloseDialog={handleCloseRenameDialog}
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      dialogActions={dialogActions}
    />
  );
};

export default RenameDialog;
