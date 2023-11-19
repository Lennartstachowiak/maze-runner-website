import React, { useEffect, useRef } from "react";
import { AlgorithmInterface } from "../../types/Algorithm/types";
import Grid from "@mui/material/Grid";
import CodeBlockComponent from "../organisms/Algorithm/AlgorithmCodeBlock";
import {
  deleteAlgorithm,
  getMazeAlgorithmSolution,
  renameAlgorithm,
  saveAlgorithmChanges,
  useGetSingleAlgorithm,
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
import { MazeSolution } from "./MazePage";
import InfoBlock from "../organisms/Maze/InfoBlock";

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

  const mazeRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 899px)");

  const [testMazeSolution, setTestMazeSolution] =
    React.useState<MazeSolution | null>(null);

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

  useEffect(() => {
    if (mazeRef.current) {
      mazeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [testMazeSolution]);

  if (isError) {
    return <>ERROR</>;
  }
  if (isLoading) {
    return <CircularProgress />;
  }

  interface ActionButtonProps {
    editableCode: string;
  }
  const ActionButton = (props: ActionButtonProps) => {
    const { editableCode } = props;
    const algorithmId = algorithm?.id;
    const handleSaveChanges = async () => {
      if (editableCode && algorithmId) {
        await saveAlgorithmChanges({
          algorithmId: algorithmId,
          newCode: editableCode,
        });
      }
    };
    const handleTestMaze = async () => {
      await handleSaveChanges();
      const mazeSearchSolution: MazeSolution = await getMazeAlgorithmSolution({
        algorithmId: algorithm_id,
        mazeId: "100",
      });
      setTestMazeSolution(mazeSearchSolution);
    };

    return (
      <Button variant="outlined" color="secondary" onClick={handleTestMaze}>
        <Typography variant="h5" color="secondary">
          Test and save code
        </Typography>
      </Button>
    );
  };

  return (
    <Grid
      container
      direction="row"
      spacing={5}
      paddingTop={isSmallScreen ? 5 : 0}
    >
      <Grid item md={7.8} xs={12}>
        <CodeBlockComponent
          algorithm={algorithm}
          showLineNumbers={true}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          handleOpenRenameDialog={handleOpenRenameDialog}
          ActionButtonComponent={ActionButton}
          editable={true}
        />
      </Grid>
      <Grid item md={4.2} xs={12} ref={mazeRef}>
        <InfoBlock mazeSolution={testMazeSolution} />
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
