import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { handleLogin, handleRegister } from "../../../modules/auth/api/AuthAPI";
import CloseIcon from "@mui/icons-material/Close";

interface RegisterDialogProps {
  openRegisterDialog?: boolean;
  handleCloseRegisterDialog: () => void;
}

const RegisterDialog = (props: RegisterDialogProps) => {
  const { openRegisterDialog = true, handleCloseRegisterDialog = undefined } =
    props;
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatedPassword, setRepeatedPassword] = React.useState("");

  const handleClickLogin = () => {
    handleLogin(email, password);
  };

  const handleClickRegister = () => {
    handleRegister(email, password, repeatedPassword);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={openRegisterDialog}
      onClose={handleCloseRegisterDialog}
    >
      <DialogTitle id={"title"}>{isLogin ? "Login" : "Register"}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseRegisterDialog}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            id="email"
            label="E-Mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isLogin ? (
            <></>
          ) : (
            <TextField
              type="password"
              id="repeatPassword"
              label="Repeat password"
              value={repeatedPassword}
              onChange={(event) => setRepeatedPassword(event.target.value)}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={<Switch onClick={() => setIsLogin(!isLogin)} />}
          label={isLogin ? "Switch to register" : "Switch to login"}
        />
        {isLogin ? (
          <Button onClick={handleClickLogin} color="primary">
            Login
          </Button>
        ) : (
          <Button onClick={handleClickRegister} color="primary">
            Register
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
