import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import React from "react";

interface LoadingDialogProps {
  loading: boolean;
}

const LoadingDialog = (props: LoadingDialogProps) => {
  const { loading } = props;
  return (
    <Dialog maxWidth="xs" open={loading}>
      <Box
        justifyContent="center"
        alignItems="center"
        paddingX={4}
        paddingY={2}
      >
        <DialogContent>
          <CircularProgress />
        </DialogContent>
        <Typography textAlign="center" variant="body1" color="initial">
          Loading...
        </Typography>
      </Box>
    </Dialog>
  );
};

export default LoadingDialog;
