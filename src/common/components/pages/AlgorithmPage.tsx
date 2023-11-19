import { useEffect, useState } from "react";
import React from "react";
import {
  AlgorithmListHorizontal,
  AlgorithmListVertical,
} from "../organisms/Algorithm/AlgorithmPreviewBlock";
import { AlgorithmInterface } from "../../types/Algorithm/types";
import Grid from "@mui/material/Grid";
import CodeBlockComponent from "../organisms/Algorithm/AlgorithmCodeBlock";
import {
  addNewAlgorithm,
  deleteAlgorithm,
  renameAlgorithm,
  useGetAlgorithms,
} from "../../../modules/API";
import { KeyedMutator } from "swr";
import {
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DeleteDialog from "../molecules/Algorithm/DeleteDialog";
import RenameDialog from "../molecules/Algorithm/RenameDialog";
import { useRouter } from "next/router";

const AlgorithmPage = () => {
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

  const isSmallScreen = useMediaQuery("(max-width: 899px)");

  if (isError) {
    return <>ERROR</>;
  }
  if (isLoading) {
    return <CircularProgress />;
  }
  const GoToEditActionButton = () => {
    const router = useRouter();
    const algorithmId = selectedAlgorithm?.id;
    return (
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push(`/my_algorithms/${algorithmId}`)}
      >
        <Typography variant="h5" color="secondary">
          Edit Algorithm
        </Typography>
      </Button>
    );
  };

  return (
    <Grid container wrap="wrap">
      <Grid item md={3} minWidth={260}>
        {isSmallScreen ? (
          <AlgorithmListHorizontal
            title="My Algorithms"
            selectedAlgorithm={selectedAlgorithm}
            setAlgorithm={setAlgorithm}
            algorithmList={algorithmList}
            handelAddAlgorithm={handelAddAlgorithm}
          />
        ) : (
          <AlgorithmListVertical
            title="My Algorithms"
            selectedAlgorithm={selectedAlgorithm}
            setAlgorithm={setAlgorithm}
            algorithmList={algorithmList}
            handelAddAlgorithm={handelAddAlgorithm}
          />
        )}
      </Grid>
      <Grid item width={isSmallScreen ? "100%" : "60vw"}>
        <CodeBlockComponent
          algorithm={selectedAlgorithm}
          showLineNumbers={true}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          handleOpenRenameDialog={handleOpenRenameDialog}
          ActionButtonComponent={GoToEditActionButton}
          editable={false}
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

export default AlgorithmPage;
