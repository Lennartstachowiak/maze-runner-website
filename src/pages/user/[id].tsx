import { useRouter } from "next/router";
import { followUser, getUser, useGetUserMazes } from "../../modules/API";
import MazeSelection from "../../common/components/template/Maze/MazeSelection";
import React from "react";
import { MazeProps } from "../../common/types/maze";
import { Grid } from "@mui/material";
import TextButton from "../../common/components/atoms/Button/TextButton";
import LoadingDialog from "../../common/components/molecules/LoadingDialog";

const UserPage = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  const { user, isLoading: userLoading, isError: userError } = getUser(userId);
  const {
    mazes,
    isLoading: mazeLoading,
    isError: mazeError,
  } = useGetUserMazes(userId);
  const [selectedMaze, setSelectedMaze] = React.useState<MazeProps | null>(
    null
  );
  const handleFollowUser = async () => {
    await followUser(userId);
  };
  const handleFollowMaze = async () => {
    return;
  };
  if (userLoading) {
    return <LoadingDialog loading={userLoading} />;
  }
  if (userError) {
    console.error(userError);
  }
  return (
    <Grid container direction="column">
      <Grid item>
        <TextButton text={"Follow User"} handleClick={handleFollowUser} />
      </Grid>
      <Grid item>
        <MazeSelection
          mazes={mazes}
          title={`Mazes of ${user?.email}`}
          selectedMaze={selectedMaze}
          setMaze={setSelectedMaze}
          isLoading={mazeLoading}
          isError={mazeError}
        />
      </Grid>
      {selectedMaze && (
        <Grid item>
          <TextButton
            text={"Follow Maze"}
            handleClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default UserPage;
