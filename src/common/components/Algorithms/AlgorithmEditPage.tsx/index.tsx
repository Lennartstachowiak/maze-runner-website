import React from "react";
import { AlgorithmInterface } from "../AlgorithmPreviewList/types";
import Grid from "@mui/material/Grid";
import CodeBlockComponent from "../AlgorithmCodeBlock.tsx";
import {
  deleteAlgorithm,
  renameAlgorithm,
  saveAlgorithmChanges,
  useGetSingleAlgorithm,
} from "../../../../modules/API";
import { KeyedMutator } from "swr";
import { Button, CircularProgress, Typography } from "@mui/material";
import DeleteDialog from "../components/DeleteDialog";
import RenameDialog from "../components/RenameDialog";
import { useRouter } from "next/router";

const EditPage = () => {
  const router = useRouter();
  const algorithm_id = router.query.id as string;
  const {
    algorithm,
    isLoading,
    isError,
    mutate,
  }: {
    algorithm: AlgorithmInterface;
    isLoading: boolean;
    isError: boolean;
    mutate: KeyedMutator<unknown>;
  } = useGetSingleAlgorithm(algorithm_id);
  console.log(algorithm);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const [openRenameDialog, setOpenRenameDialog] = React.useState(false);
  const handleOpenRenameDialog = () => {
    setOpenRenameDialog(true);
  };
  const handleCloseRenameDialog = () => {
    setOpenRenameDialog(false);
  };

  const handleEditName = async (algorithmId: string, newName: string) => {
    if (algorithmId) {
      await renameAlgorithm({ algorithmId: algorithmId, newName: newName });
      await mutate();
    }
  };
  const handleDeleteAlgorithm = async (algorithmId: string) => {
    if (algorithmId) {
      await deleteAlgorithm({ algorithmId: algorithmId });
      router.back();
      await mutate();
    }
  };

  if (isError) {
    return <>ERROR</>;
  }
  if (isLoading) {
    return <CircularProgress />;
  }
  const ActionButton = () => {
    const editableCode = algorithm?.code;
    const algorithmId = algorithm?.id;
    const handleSaveChanges = async () => {
      if (editableCode && algorithmId) {
        await saveAlgorithmChanges({
          algorithmId: algorithmId,
          newCode: editableCode,
        });
      }
    };
    return (
      <Button variant="outlined" color="secondary" onClick={handleSaveChanges}>
        <Typography variant="h5" color="secondary">
          Save Changes
        </Typography>
      </Button>
    );
  };

  return (
    <Grid container>
      <Grid item>
        <CodeBlockComponent
          algorithm={algorithm}
          showLineNumbers={true}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          handleOpenRenameDialog={handleOpenRenameDialog}
          ActionButtonComponent={ActionButton}
          editable={true}
        />
      </Grid>

      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        selectedAlgorithm={algorithm}
        handleDeleteAlgorithm={handleDeleteAlgorithm}
      />
      <RenameDialog
        openRenameDialog={openRenameDialog}
        handleCloseRenameDialog={handleCloseRenameDialog}
        selectedAlgorithm={algorithm}
        handleEditName={handleEditName}
      />
    </Grid>
  );
};

export default EditPage;
