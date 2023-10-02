import { useState } from "react";
import React from "react";
import { AlgorithmListVertical } from "./AlgorithmPreviewList/AlgorithmPreviewBlock";
import { AlgorithmInterface } from "./AlgorithmPreviewList/types";
import Grid from "@mui/material/Grid";
import CodeBlockComponent from "./AlgorithmCodeBlock.tsx";
import {
  addNewAlgorithm,
  deleteAlgorithm,
  useGetAlgorithms,
} from "../../../modules/API";
import { KeyedMutator } from "swr";
import { CircularProgress } from "@mui/material";
import DeleteDialog from "./components/DeleteDialog";

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

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handelAddAlgorithm = async () => {
    await addNewAlgorithm();
    mutate();
  };
  const handleEditName = async (algorithmId: string) => {
    console.log(algorithmId);
  };
  const handleDeleteAlgorithm = async (algorithmId: string) => {
    if (algorithmId) {
      await deleteAlgorithm({ algorithmId: algorithmId });
      setAlgorithm(null);
      mutate();
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
          handleEditName={handleEditName}
        />
      </Grid>
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        selectedAlgorithm={selectedAlgorithm}
        handleDeleteAlgorithm={handleDeleteAlgorithm}
      />
    </Grid>
  );
};

export default MyAlgorithms;
