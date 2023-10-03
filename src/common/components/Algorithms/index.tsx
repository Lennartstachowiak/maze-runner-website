import { useEffect, useState } from "react";
import React from "react";
import { AlgorithmListVertical } from "./AlgorithmPreviewList/AlgorithmPreviewBlock";
import { AlgorithmInterface } from "./AlgorithmPreviewList/types";
import Grid from "@mui/material/Grid";
import CodeBlockComponent from "./AlgorithmCodeBlock.tsx";
import {
  addNewAlgorithm,
  deleteAlgorithm,
  renameAlgorithm,
  useGetAlgorithms,
} from "../../../modules/API";
import { KeyedMutator } from "swr";
import { CircularProgress } from "@mui/material";
import DeleteDialog from "./components/DeleteDialog";
import RenameDialog from "./components/RenameDialog";

const MyAlgorithms = () => {
  const [selectedAlgorithm, setAlgorithm] = useState<AlgorithmInterface | null>(
    null
  );
  const {
    algorithmList,
    isLoading,
    isError,
    mutate,
  }: {
    algorithmList: AlgorithmInterface[];
    isLoading: boolean;
    isError: boolean;
    mutate: KeyedMutator<unknown>;
  } = useGetAlgorithms();

  useEffect(() => {
    if (algorithmList && selectedAlgorithm) {
      setAlgorithm(
        algorithmList.find(
          (algorithm) => algorithm.id === selectedAlgorithm?.id
        )!
      );
    }
  }, [algorithmList]);

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

  const handelAddAlgorithm = async () => {
    await addNewAlgorithm();
    await mutate();
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
      setAlgorithm(null);
      await mutate();
    }
  };

  if (isError) {
    return <>ERROR</>;
  }
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Grid container>
      <Grid item xs={3}>
        <AlgorithmListVertical
          title="My Algorithms"
          selectedAlgorithm={selectedAlgorithm}
          setAlgorithm={setAlgorithm}
          algorithmList={algorithmList}
          handelAddAlgorithm={handelAddAlgorithm}
        />
      </Grid>
      <Grid item xs={9}>
        <CodeBlockComponent
          algorithm={selectedAlgorithm}
          showLineNumbers={true}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          handleOpenRenameDialog={handleOpenRenameDialog}
        />
      </Grid>
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        selectedAlgorithm={selectedAlgorithm}
        handleDeleteAlgorithm={handleDeleteAlgorithm}
      />
      <RenameDialog
        openRenameDialog={openRenameDialog}
        handleCloseRenameDialog={handleCloseRenameDialog}
        selectedAlgorithm={selectedAlgorithm}
        handleEditName={handleEditName}
      />
    </Grid>
  );
};

export default MyAlgorithms;
